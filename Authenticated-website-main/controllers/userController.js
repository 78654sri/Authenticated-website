const {generateTokenForUser} = require('../utils/auth')
const User = require('../models/user')
exports.handleUserLogin = async function(req,res){
    const { email,password }=req.body;
    try{
        if(!email || !password) throw new Error('Email and Password are required')

        const user = await User.findOne({email});
        if(!user) throw new Error(`User with ${email} does not exists`)

        if(user.password!==password) throw new Error(`invalid password`);
        //token
        const token =await generateTokenForUser(user._id);
        return res.cookie('token',token).redirect('/');

    }catch(error){
        res.render('login',{
            error
        });

    }
};


exports.handleUserSignUp = async function(req, res) {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName) throw new Error('Full Name is Required');
        if (!email) throw new Error('Email is Required');
        if (!password || password.length < 5)
            throw new Error('Password is Required and min length must be 5');

        const user = await User.create({ fullName, email, password });
        const token = await generateTokenForUser(user._id);

        return res.render('login', { message: 'Signup success' });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            res.render('signup', {
                error: 'Email is already registered'
            });
        } else {
            console.error('Error during signup:', error);
            res.render('signup', {
                error: error.message
            });
        }
    }
};

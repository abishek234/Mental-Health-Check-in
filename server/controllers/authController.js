const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const {email,firstname,lastname,password,cpassword,phoneno,location} = req.body;
    if (!email || !firstname || !lastname || !password || !cpassword || !phoneno || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

  

    if (password !== cpassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    try {
    const user = new User({
        email,
        firstname,
        lastname,
        password: hashedPassword,
        phoneno,
        location
    });

    await user.save();
    
    res.json({ message: 'User registered' });
}
catch(err){
    console.log(err);

}
 
};

exports.login =  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token,email : user.email });
}
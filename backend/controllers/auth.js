const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//  import the models
const  {User } = require("../models/User.js");

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      //   viewedProfile,
      //   impressions,
    } = req.body;

    // const salt = bcrypt.genSaltSync(10);
    // const hashpassword = bcrypt.hashSync(password, salt);

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
    
      firstName,
      lastName,
      email,
      password: hashpassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    res.status(201).json({
      _id : newUser._id,
      firstName: newUser.firstName,
      LastName: newUser.LastName,
      email: newUser.email,
      picturePath: newUser.picturePath,
      friends: newUser.friends,
      location: newUser.location,
      occupation: newUser.occupation,
      viewedProfile: newUser.viewedProfile,
      impressions: newUser.impressions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log(user);
      return res.status(400).json({ msg: "User does not exist" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);

    console.log(user);
    console.log(user.password, password);
    const isMatch = await bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result == false) {
          return res.status(400).json({ msg: "Invalid credetials" });
        }
      })
      .catch((e) => {
        console.log(e);
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    delete user.password;

    res.status(200).json({token , user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };

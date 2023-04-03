const express = require("express");
const { User } = require("../models/User.js");

const getUser = async (req, res, next) => {
  try {
    // we can grap the id fromt the req.paramsn

    const { id } = req.params;
    console.log("User id: " + id);

    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getUserFriends = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  // look the friends stored the data of the user friends and the
  const friends = await Promise.all(
    // this will iterate over the friends array and get the data of all the friends of the user
    user.friends.map((id) => User.findById(id))
  );

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  res.status(200).send(formattedFriends)
};
const addRemoveFriends = async (req, res, next) => {};

module.exports = { getUser, getUserFriends, addRemoveFriends };

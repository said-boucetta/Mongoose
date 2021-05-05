// const { v4: uuidv4 } = require("uuid");
const User = require("../../models/user");
let users = [
  {
    id: 1,
    nom: "nom",
    prenom: "prenom",
    email: "email",
    phone: "phone",
    isActif: true,
  },
];

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};
const addUser = async (req, res) => {
  const { nom, prenom, phone, email } = req.body;
  // const user = {
  //   id: uuidv4(),
  //   nom,
  //   prenom,
  //   email,
  //   phone,
  //   isActif: true,
  // };
  // users.push(user);
  const user = new User({
    nom,
    prenom,
    email,
    phone,
    isActif: true,
  });

  await user.save();

  res.status(201).send(user);
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, phone } = req.body;

  //const user = users.find((elem) => elem.id == id);
  const user = await User.findById(id);

  if (!user) {
    return res.status(400).send({
      message: "user not found",
    });
  }

  // user.nom = nom || user.nom;
  // user.prenom = prenom || user.prenom;
  // user.email = email || user.email;
  // user.phone = phone || user.phone;

  const user2 = {};
  user2.nom = nom || user.nom;
  user2.prenom = prenom || user.prenom;
  user2.email = email || user.email;
  user2.phone = phone || user.phone;

  const updatedUser = await User.findByIdAndUpdate(id, user2, { new: true });

  if (!updatedUser) {
    return res.status(500).send({
      message: "Server error",
    });
  }

  res.status(200).send(updatedUser);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  //const user = users.find((elem) => elem.id == id);
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      message: "user not found",
    });
  }
  // users = users.filter((elem) => elem.id != id);
  const removedUser = await User.findByIdAndDelete(id);
  if (!removedUser) {
    return res.status(500).send({
      message: "Server error",
    });
  }
  res.status(200).send(removedUser);
};
const getOneUser = async (req, res) => {
  const { id } = req.params;
  //const user = users.find((elem) => elem.id == id);
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      message: "user not found",
    });
  }
  res.status(200).send(user);
};
const patchUser = async (req, res) => {
  const { id } = req.params;
  //const user = users.find((elem) => elem.id == id);
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      message: "user not found",
    });
  }
  // user.isActif = !user.isActif;
  const patchedUser = await User.findByIdAndUpdate(
    id,
    {
      isActif: !user.isActif,
    },
    { new: true }
  );
  if (!patchedUser) {
    return res.status(500).send({
      message: "Server error",
    });
  }
  res.status(200).send(patchedUser);
};

module.exports = {
  getUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  patchUser,
};

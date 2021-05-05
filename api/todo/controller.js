const { v4: uuidv4 } = require("uuid");

let todos = [
  {
    id: 5,
    task: "todo 1",
    checked: false,
  },
  {
    id: 12,
    task: "todo 2",
    checked: true,
  },
];

const getTodos = (req, res) => {
  res.status(200).send(todos);
};

const addTodo = (req, res) => {
  // const task = req.body.task
  const { task } = req.body;
  const todo = {
    id: uuidv4(),
    task, //task: task
    checked: false,
  };
  todos.push(todo);
  res.status(201).send(todo);
};

const updateTodo = (req, res) => {
  try {
    const { task } = req.body;
    const { id } = req.params;
    const todo = todos.find((elem) => elem.id == id);
    if (todo == undefined) {
      return res.status(400).send({
        message: "todo not existe",
      });
    }
    todo.task = task;
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error interne",
    });
  }
};

const patchTodo = (req, res) => {
  try {
    const { id } = req.params;
    const todo = todos.find((elem) => elem.id == id);
    if (todo == undefined) {
      return res.status(400).send({
        message: "todo not existe",
      });
    }
    todo.checked = !todo.checked;
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error interne",
    });
  }
};

const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    // const index = todos.findIndex((elem) => elem.id == id);
    // if (index == -1) {
    //   return res.status(400).send({
    //     message: "todo doesn't exist",
    //   });
    // }
    // todos.splice(index, 1);
    const todo = todos.find((elem) => elem.id == id);
    if (todo == undefined) {
      return res.status(400).send({
        message: "todo doesn't exist",
      });
    }
    todos = todos.filter((elem) => elem.id != id);
    res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error interne",
    });
  }
};

const getOneTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((elem) => elem.id == id);
  if (!todo) {
    res.status(400).send({
      message: "todo not found",
    });
  }
  res.status(200).send(todo);
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  getOneTodo,
};

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/todoListModel");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/TodoListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/api/todo/get", async (req, res) => {
  const records = await Todo.find({});
  console.log("get todoList", records);
  res.json(records);
});

app.post("/api/todo/create", async (req, res) => {
  const record = req.body;
  if (record.name.trim().length === 0) {
    return res.status(404).send({
      message: "user value is empty!",
    });
  }
  const response = await Todo.create(record);
  console.log("created new todoList", response);
  res.json({ status: "new customer created successfully" });
});

app.get("/api/todo/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving todo with id=" + id });
    });
});

app.put("/api/edit/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update todo with id=${id}. Maybe todo was not found!`,
        });
      } else res.send({ message: "todo updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating todo with id=" + id,
      });
    });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete todo with id=${id}. Maybe todo was not found!`,
        });
      } else {
        res.send({
          message: "todo deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete todo with id=" + id,
      });
    });
});

const port = 8000;

app.listen(port, () => console.log(`{Server started on port ${port}}`));

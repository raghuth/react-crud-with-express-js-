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

app.get("/api/todo", async (req, res) => {
  const records = await Todo.find({});
  console.log("get todoList", records);
  res.json(records);
});

app.get("/api/todo/:id", (req, res) => {
  let id = Number(req.params._id);
  let product = Todo.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send("todo not found");
  }
  res.json(product);
});

app.post("/api/todo-list/create", async (req, res) => {
  const record = req.body;
  console.log(record);
  const response = await Todo.create(record);
  console.log("created new todoList", response);
  res.json({ status: "new customer created successfully" });
});

// app.delete("/api/delete/:id", async (req, res) => {
//   let deleteTodo = req.params.id;
//   console.log("deleteTodo", deleteTodo);
//   await Todo.deleteOne({ _id: deleteTodo }, (err, data) => {
//     if (err) {
//       res.status(500),
//         json({
//           massage: " todo delete error",
//         });
//     } else {
//       res.status(200).json({
//         massage: " deleted todo successfully",
//       });
//     }
//   });
// });

const port = 8000;

app.listen(port, () => console.log(`{Server started on port ${port}}`));

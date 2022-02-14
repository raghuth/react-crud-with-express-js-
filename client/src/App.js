import * as React from "react";
import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./components/home/home";
import TodoList from "./components/todo-list/todo-list";

function App() {
  function BlogPost() {
    let { id } = useParams();
    return <div style={{ fontSize: "50px" }}>Now showing post {id}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/page/:id" element={<BlogPost />} />
          {/* <Route path="/update-todo/:id" element={<TodoList />} /> */}
        </Routes>
      </header>
    </div>
  );
}

export default App;

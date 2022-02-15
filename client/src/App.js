import * as React from "react";
import "./App.css";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import TodoList from "./components/todo-list/todo-list";

function App() {
  function Profile() {
    // 'https://www.url.com/users/:userId'
    const { userId } = useParams();
    // user profile...
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/todo" />} />
        <Route path="/todo" element={<TodoList />} />
        <Route exact path="/edit/:id" element={<TodoList />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Signin from "./component/signin";
import Nav from "./component/Nav";
import Task from "./component/Task";

function App() {
  
  return (
    <>
          <Routes>
          <Route exact path="/nav" element={<Nav />} />
          <Route exact path="/task" element={<Task />} />
        </Routes>
        
        <Routes>
        <Route exact path="/" element={<Signin />} />
          <Route exact path="/login" element={<Login />} />
          </Routes>
    </>
  );
}
export default App;

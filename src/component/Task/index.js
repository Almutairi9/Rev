import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../component/Nav";

const Todos = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [update, setUpdate] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    User();
    // getAllTasks();
  }, []);

  const User = () =>{
    
    const newToken = localStorage.getItem("token");
    setToken(newToken);
    getAllTasks(newToken);
  }
  //get all tasks
  const getAllTasks = async (token) => {
    try {
      console.log(token);
      const result = await axios.get(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      setTasks(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // add new task
  const addNewTask = async () => {
    try {
      console.log(task);
      await axios.post(
        `${BASE_URL}/todos`,
        {
          task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    getAllTasks(token);
  };

  // update task
  const updateTask = async (id) => {
    // const task = prompt("update ... ");
    try {
      console.log(task);
      await axios.put(
        `${BASE_URL}/todos/${id}`,
        {
          task, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllTasks(token);
    } catch (error) {
      console.log(error);
    }
  };

  // delete task by id
  const deleteTask = async (id) => {
    try {
      console.log(id);
      await axios.delete(`${BASE_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllTasks(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <br />
      <div>
        <input
          onChange={(e) => setTask(e.target.value)}
          placeholder="add Tasks"
        />{" "}
        <br />
        <br />
        <button className="btn" onClick={addNewTask}>
          Add New Task
        </button>
      </div>
      <div>
        {tasks.length &&
          tasks.map((item) => (
            <div key={item._id}>
              <h2>{item.task}</h2>
              <button onClick={() => updateTask(item._id)}>Update</button>
              <button onClick={() => deleteTask(item._id)}>Delete</button>
            </div>
          ))}
      </div>
      <br />
    </>
  );
};

export default Todos;

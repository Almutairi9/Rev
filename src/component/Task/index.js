import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../component/Nav";

const Todos = ({ token }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [update, setUpdate] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  //get all tasks
  const getAllTasks = async () => {
    try {
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
      await axios.post(
        `${BASE_URL}/todos`,
        {
          name: task,
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

  // edit task
  const updateTask = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}/todos/${id}`,
        {
          name: update,
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
      await axios.delete(`${BASE_URL}/delete/${id}`, {
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
      {/* <div>
        {tasks.length &&
          tasks.map((item) => (
            <>
              <h2 key={item._id}>{item.name}</h2>
              <button onClick={() => updateTask(item._id)}>Update</button>
              <button onClick={() => deleteTask(item._id)}>Delete</button>
            </>
          ))}
      </div> */}
      <br />
    </>
  );
};

export default Todos;

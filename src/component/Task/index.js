import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [allTasks, setAllTasks] = useState([]);
  const [token, setToken] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    let tokenn = localStorage.getItem("token");
    let userID = localStorage.getItem("userID");

    setToken(tokenn);
    const tasks = await axios.post(`${BASE_URL}/todos`,
      { reqUserId: userID },
      {
        headers: {
          Authorization: `Bearer ${tokenn}`,
        },
      }
    );
    setAllTasks(tasks.data);
  };

  const addTask = async () => {
    await axios.post(
      `${BASE_URL}/todos`,
      { user: localStorage.getItem("userID"), name: newTask },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getAllTask();
  };

  return (
    <div className="home">
      <input
        type="text"
        placeholder="new task"
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <button onClick={addTask}> add </button>

      {!allTasks.length ? (
        <h2> you dont have any tasks</h2>
      ) : (
        <div className="anim">
          {allTasks.map((ele) => {
            return (
              <div>
                <h3> {ele.name} </h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Task;

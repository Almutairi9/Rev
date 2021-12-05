import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const getTask = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/todos`,{
            headers: { Authorization: `bearer ${token}` },
        });
        console.log(result);
        setData(result.data);
    } catch (error) {
        console.log(error);
    }
  };

  const newTodo = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/todos`,
        {
          desc: e.target.todo.value,
        },
        {
          headers: { Authorization: `bearer ${token}`},
        }
      );
      console.log(result);
      e.target.todo.value = "";
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []); 

  return(
   <>
    <div className='todo'>
      <h1>Task:</h1>
      <form onSubmit={newTodo} className='new'>
        <p>New Task:</p>
        <input type="text" name="todo" />
        <br></br> <br></br> 
        <button type="submit">Add</button>
      </form>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <h2 style={{ display: "inline" }}>{item.desc}</h2>
            {/* <button onClick={() => del(item._id)}>x</button> */}
            <br />
          </div>
        );
      })}

      {/* <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button> */}
    </div>
   </>)
};

export default Task;

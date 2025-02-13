import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://k8s-myappingress-aed710839d-1334484464.us-east-1.elb.amazonaws.com";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post(`${API_URL}/tasks`, {
      title: newTask.title,
      description: newTask.description,
      status: "pending",
    }).then(() => window.location.reload());
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`).then(() => window.location.reload());
  };

  const markComplete = (id) => {
    axios.patch(`${API_URL}/tasks/${id}`, { status: "completed" })
      .then(() => window.location.reload());
  };

  return (
    <div className="container">
      <h1>Task Management</h1>
      
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <span className={task.status === 'pending' ? 'status-pending' : 'status-completed'}>{task.status}</span>
            </div>
            <div>
              {task.status === 'pending' && (
                <button onClick={() => markComplete(task.id)} className="complete-button">Complete</button>
              )}
              <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

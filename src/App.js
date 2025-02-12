import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const API_URL = "http://k8s-myappingress-aed710839d-1334484464.us-east-1.elb.amazonaws.com";

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

  return (
    <div>
      <h1>Task Management</h1>
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

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

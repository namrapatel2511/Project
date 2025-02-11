import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    axios.get("http://backend-service.default.svc.cluster.local/tasks").then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post("http://backend-service.default.svc.cluster.local/tasks", {
      title: newTask.title,
      description: newTask.description,
      status: "pending",
    }).then(() => window.location.reload());
  };

  const deleteTask = (id) => {
    axios.delete(`http://backend-service.default.svc.cluster.local/tasks
/${id}`).then(() => window.location.reload());
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

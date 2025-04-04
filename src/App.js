import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", time: "", date: "", email_id: "" });

  const API_URL = "http://54.208.253.226:9001";

  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    const { title, description, time, date, email_id } = newTask;

    if (!title || !description || !time || !date || !email_id) {
      alert("Please fill all the fields before adding task.");
      return;
    }

    axios
      .post(`${API_URL}/tasks`, {
        title,
        description,
        time,
        date,
        email_id,
        status: "pending",
      })
      .then(() => window.location.reload());
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`).then(() => window.location.reload());
  };

  const markComplete = (id) => {
    axios.patch(`${API_URL}/tasks/${id}`, { status: "completed" }).then(() => window.location.reload());
  };

  return (
    <div className="container">
      <h1 className="title">Task Management</h1>

      {/* Task Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <input
          type="time"
          value={newTask.time}
          onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email ID"
          value={newTask.email_id}
          onChange={(e) => setNewTask({ ...newTask, email_id: e.target.value })}
        />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-info">
                <h2>Task: {task.title}</h2>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Date:</strong> {task.date ? new Date(task.date).toISOString().split("T")[0] : "N/A"}</p>
                <p><strong>Time:</strong> {task.time}</p>
                <p><strong>Email:</strong> {task.email_id}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {task.status === "pending" ? <span className="status-pending">⏳</span> : <span className="status-completed">✅</span>}
                </p>
              </div>
              <div className="task-actions">
                {task.status === "pending" && (
                  <button className="complete-btn" onClick={() => markComplete(task.id)}>
                    ✅ Complete
                  </button>
                )}
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available. Add a new task!</p>
        )}
      </div>
    </div>
  );
}

export default App;

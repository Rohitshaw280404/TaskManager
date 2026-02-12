import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css"
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");


  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      // not logged in
      navigate("/");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  // Edit taks -on clicking edit button, using use state to manage editing, do not use prompt
  const editTask = async (id) => {
  try {
    const taskToEdit = tasks.find((task) => task._id === id);
    if (!taskToEdit) return;

    const updatedTitle = prompt("Enter new title:", taskToEdit.title);

    // If user clicks Cancel
    if (updatedTitle === null) return;

    // Prevent empty update
    if (!updatedTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    await api.put(`/tasks/${id}`, {
      title: updatedTitle.trim(),
    });

    loadTasks();

  } catch (error) {
    console.error("Error updating task:", error.response?.data || error.message);
  }
};

 
  // Logout
  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Tasks</h2>

        {/* Add task */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-2 rounded bg-slate-800 outline-none"
            placeholder="New task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-600 px-4 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-slate-800 p-3 rounded flex justify-between items-center"
            >
              <span>{task.title}</span>

              {/* Edit task */}

               <button
                onClick={() => editTask(task._id)}
                className="text-blue-400 hover:text-blue-600"
              >
                Edit
              </button>

               {/* Delete task */}

              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-400 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-6 text-sm text-red-400 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

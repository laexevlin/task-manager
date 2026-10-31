import { useState, useEffect } from "react";
import * as tasksApi from "../api/tasks.js";

export function useTasks(onAlert) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await tasksApi.getTasks();
        setTasks(data);
      } catch (err) {
        onAlert(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  async function addTask(data) {
    let createdTask;
    try {
      createdTask = await tasksApi.createTask(data);
    } catch (err) {
      onAlert(err.message);
      return;
    }

    setTasks((prev) => [...prev, createdTask]);
  }

  async function moveTask(id, status) {
    let updatedTask;
    try {
      updatedTask = await tasksApi.changeTaskStatus(id, status);
    } catch (err) {
      onAlert(err.message);
      return;
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task)),
    );
  }

  async function removeTask(id) {
    try {
      await tasksApi.deleteTask(id);
    } catch (err) {
      onAlert(err.message);
      return;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return { tasks, loading, addTask, moveTask, removeTask };
}

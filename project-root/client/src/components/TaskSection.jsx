import { useTasks } from "../hooks/useTasks.js";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import { LogOut, Sun, MoonStar } from "lucide-react";

export default function TaskSection({ onLogout, onAlert, theme, onToggleTheme }) {
  const { tasks, loading, addTask, moveTask, removeTask } = useTasks(onAlert);

  return (
    <>
      <div className="app">
        <header>
          <h1>My Tasks</h1>
          <div className="header__container-btn">
            <button
              onClick={onToggleTheme}
              className="header__btn header__theme-btn"
            >
              {theme === "light" ? <MoonStar /> : <Sun />}
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="header__btn header__logout-btn"
            >
              <LogOut size={20} />
              <span>Log out</span>
            </button>
          </div>
        </header>

        <TaskForm onAdd={addTask} />
        {loading && <p>Loading...</p>}
        <TaskList tasks={tasks} onMove={moveTask} onDelete={removeTask} />
      </div>
    </>
  );
}

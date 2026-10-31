import TaskItem from "./TaskItem";
import "./TaskList.css";

const COLUMNS = [
  { status: "todo", title: "To do" },
  { status: "in_progress", title: "In progress" },
  { status: "done", title: "Done" },
];

export default function TaskList({ tasks, onMove, onDelete }) {
  return (
    <>
      <section className="task-list">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter(
            (task) => task.status === col.status,
          );

          return (
            <div className="task-list-column" key={col.status}>
              <div className="task-list-column__header">
                <h2>{col.title}</h2>
                <p className="task-list-column__count">{columnTasks.length}</p>
              </div>
              <div className="task-list-column__body">
                {columnTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onMove={onMove}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

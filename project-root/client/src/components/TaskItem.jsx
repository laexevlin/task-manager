import "./TaskItem.css";

const NEXT_STATUS = { todo: "in_progress", in_progress: "done" };

export default function TaskItem({ task, onMove, onDelete }) {
  const next = NEXT_STATUS[task.status];

  return (
    <>
      <div className="task-item">
        <h3 className="task-item__title">{task.title}</h3>
        <p className="task-item__description">{task.description}</p>
        <div className="task-item__footer">
          <p className={`task-item__status task-item__status--${task.status}`}>
            {task.status}
          </p>
          <div className="task-item__btns">
            <button
              className="task-item__btn-status task-item__btn"
              aria-label="Change status"
              onClick={() => onMove(task.id, next)}
            >
              →
            </button>
            <button
              className="task-item__btn-delete task-item__btn"
              aria-label="Delete"
              onClick={() => onDelete(task.id)}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";

import "./TaskForm.css";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    setError(null);
    setSubmitting(true);
    try {
      await onAdd({ title, description });
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="task-form">
        <form onSubmit={handleSubmit} className="task-form__form">
          <input
            className="task-form__input task-form__input-title"
            autoComplete="off"
            placeholder="Task title"
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            className="task-form__input task-form__input-desc"
            autoComplete="off"
            placeholder="Description"
            id="task-desc"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button
            type="submit"
            className="task-form__btn"
            disabled={submitting}
          >
            {submitting ? "Adding a task..." : "Add a task"}
          </button>
          {error && <p className="task-form__error-message">{error.message}</p>}
        </form>
      </section>
    </>
  );
}

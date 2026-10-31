const API = "/api";

export async function getTasks() {
  const result = await fetch(`${API}/tasks`);
  const data = await result.json();
  if (!result.ok) throw new Error(data.error || "Failed to load tasks");
  return data;
}

export async function createTask(data) {
  const response = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok)
    throw new Error(responseData.error || "Failed to add a new task");
  return responseData;
}

export async function changeTaskStatus(id, status) {
  const response = await fetch(`${API}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "Failed to change the status of the task");
  return data;
}

export async function deleteTask(id) {
  const response = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to delete the task");
}

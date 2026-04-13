// services/problem.service.js

export const problemService = {
  async getAll() {
    const res = await fetch("/api/problems");
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`/api/problems/${id}`);
    return res.json();
  },

  async create(data) {
    const res = await fetch("/api/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`/api/problems/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async delete(id) {
    const res = await fetch(`/api/problems/${id}`, {
      method: "DELETE",
    });

    return res.json();
  },
};
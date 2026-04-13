// services/solution.service.js

export const solutionService = {
  async getAll() {
    const res = await fetch("/api/solutions");
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`/api/solutions/${id}`);
    return res.json();
  },

  async create(data) {
    const res = await fetch("/api/solutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`/api/solutions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async delete(id) {
    const res = await fetch(`/api/solutions/${id}`, {
      method: "DELETE",
    });

    return res.json();
  },
};
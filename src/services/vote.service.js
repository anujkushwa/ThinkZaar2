// services/vote.service.js

export const voteService = {
  async getAll() {
    const res = await fetch("/api/vote");
    return res.json();
  },

  async create(data) {
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async remove(voteId) {
    const res = await fetch("/api/vote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voteId }),
    });

    return res.json();
  },
};
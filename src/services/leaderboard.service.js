// services/leaderboard.service.js

export const leaderboardService = {
  async getAll() {
    const res = await fetch("/api/leaderboard");
    return res.json();
  },

  async create(data) {
    const res = await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};
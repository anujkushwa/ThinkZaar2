// services/user.service.js

export const userService = {
  async getAll() {
    const res = await fetch("/api/users");
    return res.json();
  },

  async create(data) {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async getProfile() {
    const res = await fetch("/api/users/profile");
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch("/api/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};
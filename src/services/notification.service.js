// services/notification.service.js

export const notificationService = {
  async getAll() {
    const res = await fetch("/api/notifications");
    return res.json();
  },

  async create(data) {
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async markRead(id) {
    const res = await fetch("/api/notifications", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return res.json();
  },

  async delete(id) {
    const res = await fetch("/api/notifications", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return res.json();
  },
};
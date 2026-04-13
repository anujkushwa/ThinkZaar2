// services/ai.service.js

const AI_BASE = "/api/ai";

export const aiService = {
  async score(payload) {
    const res = await fetch(`${AI_BASE}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  },

  async summarize(text) {
    const res = await fetch(`${AI_BASE}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    return res.json();
  },

  async detectDuplicate(payload) {
    const res = await fetch(`${AI_BASE}/detect-duplicate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  },
};
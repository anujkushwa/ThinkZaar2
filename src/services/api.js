const BASE_URL = "/api";

// 🔥 USER
export const getUser = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

// 🔥 PROBLEMS
export const getProblems = async (query = "") => {
  const res = await fetch(`${BASE_URL}/problems?${query}`);
  return res.json();
};

export const createProblem = async (data) => {
  const res = await fetch(`${BASE_URL}/problems`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
};

// 🔥 SOLUTIONS
export const getSolutions = async (problemId) => {
  const res = await fetch(`${BASE_URL}/solutions?problemId=${problemId}`);
  return res.json();
};

export const createSolution = async (data) => {
  const res = await fetch(`${BASE_URL}/solutions`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
};

// 🔥 VOTE
export const voteSolution = async (data) => {
  const res = await fetch(`${BASE_URL}/vote`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
};

// 🔥 COMMENTS
export const getComments = async (solutionId) => {
  const res = await fetch(`${BASE_URL}/comments?solutionId=${solutionId}`);
  return res.json();
};

export const addComment = async (data) => {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
};

// 🔥 AI
export const analyzeSolution = async (solutionId) => {
  const res = await fetch(`${BASE_URL}/ai/analyze`, {
    method: "POST",
    body: JSON.stringify({ solutionId }),
  });
  return res.json();
};

// 🔥 LEADERBOARD
export const getLeaderboard = async () => {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  return res.json();
};
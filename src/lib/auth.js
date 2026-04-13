export function loginUser(email, password) {
  if (email === "admin@thinkzaar.com" && password === "123456") {
    const user = {
      id: 1,
      name: "Admin User",
      email,
      role: "admin",
    };

    localStorage.setItem("thinkzaar_user", JSON.stringify(user));

    return {
      success: true,
      user,
    };
  }

  return {
    success: false,
    message: "Invalid credentials",
  };
}

export function logoutUser() {
  localStorage.removeItem("thinkzaar_user");

  return {
    success: true,
  };
}

export function getCurrentUser() {
  const user = localStorage.getItem("thinkzaar_user");

  return user ? JSON.parse(user) : null;
}

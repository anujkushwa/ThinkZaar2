export function canAccessAdminPanel(user) {
  return user?.role === "ADMIN";
}

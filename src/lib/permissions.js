export const permissions = {
  admin: [
    "manage_users",
    "manage_problems",
    "manage_solutions",
    "manage_platform",
  ],
  mentor: [
    "review_solutions",
    "guide_users",
  ],
  innovator: [
    "submit_solution",
    "vote_solution",
  ],
  student: [
    "view_problems",
    "submit_problem",
  ],
};

export function hasPermission(role, action) {
  return permissions[role]?.includes(action);
}

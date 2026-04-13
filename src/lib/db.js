export const fakeDB = {
  users: [],
  problems: [],
  solutions: [],
  votes: [],
};

export function addRecord(table, data) {
  fakeDB[table].push({
    id: Date.now(),
    createdAt: new Date(),
    ...data,
  });
}

export function getRecords(table) {
  return fakeDB[table];
}

export function deleteRecord(table, id) {
  fakeDB[table] = fakeDB[table].filter((item) => item.id !== id);
}

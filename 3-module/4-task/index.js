function showSalary(users, age) {
  const filterUsers = users.filter(user => user.age <= age);
  const result = filterUsers.map(user => `${user.name}, ${user.balance}`);
  return result.join(`\n`);
}

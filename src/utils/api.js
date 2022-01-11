const storageKey = "reactQueryList"
let users = JSON.parse(localStorage.getItem(storageKey)) || getInitialUsers()

async function getInitialUsers() {
  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json())
}

export async function getUsers() {
  await new Promise(r => setTimeout(r, 1000))
  return {
    ts: new Date(),
    users
  }
}

export async function postUsers(user) {
  await new Promise(r => setTimeout(r, 1000))
  users.append(user)
  localStorage.setItem(storageKey, JSON.stringify(users));
  return
}
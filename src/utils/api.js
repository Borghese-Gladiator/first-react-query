import { v4 as uuidv4 } from 'uuid';

const storageKey = "reactQueryList"
let userList = JSON.parse(localStorage.getItem(storageKey)) || [];
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(response => {
    // concat initial empty array with requested array
    console.log(userList)
    userList = [...userList, ...response]
    console.log(userList)
  })

export async function getUsers() {
  await new Promise(r => setTimeout(r, 1000))
  return {
    ts: new Date(),
    userList
  }
}

export async function postUsers(user) {
  const { name } = user;
  await new Promise(r => setTimeout(r, 1000))
  userList.push({
    id: uuidv4(),
    name: name === null ? "" : name
  })
  localStorage.setItem(storageKey, JSON.stringify(userList));
  return
}

/*
USER schema from jsonplaceholder
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
*/
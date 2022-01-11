import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getUsers, postUsers } from "../utils/api";
import { v4 as uuidv4 } from 'uuid';

function UserList() {
  const [text, setText] = useState('')
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const { status, data, error, isFetching } = useQuery('users', async () => {
    const data = await getUsers()
    console.log(data);
    return data
  })
  
  // Mutations
  const mutation = useMutation(postUsers, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('users')
    },
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          mutation.mutate({ id: uuidv4(), name: text })
        }}
      >
        <input
          type="text"
          onChange={event => setText(event.target.value)}
          value={text}
        />
        <button>Add User</button>
      </form>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        error.message
      ) : (
        <>
          <div>Updated At: {new Date(data.ts).toLocaleTimeString()}</div>
          <ul>
            {data.userList.map(({ id, name }, idx) => (
              <li key={`user-${idx}`}>{name}</li>
            ))}
          </ul>
          <div>{isFetching ? 'Updating in background...' : ' '}</div>
        </>
      )}
    </div>
  )
}

export default UserList;
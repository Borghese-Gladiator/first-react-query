import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getUsers, postUsers } from "../utils/api";

function UserList() {
  const [text, setText] = useState('')
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery('todos', getUsers)
  const { status, data, error, isFetching } = query
  
  // Mutations
  const mutation = useMutation(postUsers, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  });

  console.log(query)
  console.log(mutation)
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          mutation.mutate({ name: text })
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
            {data.users.map(datum => (
              <li key={datum}>{datum}</li>
            ))}
          </ul>
          <div>{isFetching ? 'Updating in background...' : ' '}</div>
        </>
      )}
    </div>
  )
}

export default UserList;
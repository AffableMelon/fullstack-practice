import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnc } from "../services/ancdotServices"
// import  from "../NotifContext"
import NotificationContext from "../NotifContext"
import { useContext } from "react"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  // const [message, messageDispatch] = useReducer(NotfiReducer, null)
  // const dispatch = useNotification
  const [message, messageDispatch] = useContext(NotificationContext)

  const newAnc = useMutation(({
    mutationFn: addAnc,
    onSuccess: (newAnc) =>{
      // queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(anecdotes, newAnc)
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnc))
      messageDispatch({ type: 'SET_NOTIFICATION', payload: `Created ${newAnc.content}`})
      setTimeout(() => messageDispatch({type: 'CLEAR_NOTIFICATION'}), 5000)
    },
    onError: (error) =>{
      messageDispatch({type: 'SET_NOTIFICATION', payload: error.response.data.error})
      setTimeout(() => messageDispatch({type: 'CLEAR_NOTIFICATION'}), 5000)
    }
  }))

  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    const anc = asObject(content)
    newAnc.mutate(anc)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

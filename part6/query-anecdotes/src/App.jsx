import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnc } from './services/ancdotServices'
import NotificationContext from './NotifContext.jsx'
import { useReducer } from 'react'
// import ancdotServices from './services/ancdotServices'


const NotfiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
}



const App = () => {

  const [message, messageDispatch] = useReducer(NotfiReducer, null)

  // const { dispatch } = useNotification()

  const queryClient = useQueryClient()

  const likePostMutation = useMutation((
     { mutationFn: updateAnc,
    onSuccess:(A) => {
      queryClient.invalidateQueries('anecdotes')
      messageDispatch({ type: 'SET_NOTIFICATION', payload: `You voted for ${A.content}`})
      setTimeout(() => messageDispatch({type: 'CLEAR_NOTIFICATION'}), 5000)
    }
  }));

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }


  if (result.error){
    return <div> error communicating with server </div>
  }

  const anecdotes = result.data
  console.log(anecdotes)



  const handleVote = (anecdote) => {
    console.log(anecdote)
    likePostMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    
      <div> 
      
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[message, messageDispatch]}>
        <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </NotificationContext.Provider>
    </div>
   
  )
}

export default App

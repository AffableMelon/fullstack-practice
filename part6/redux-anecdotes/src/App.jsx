// import { useSelector, useDispatch } from 'react-redux'
// import { voteto, NewAnc } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
// import anecdoteService from './service/anecdoteService'
import { initializeAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    // anecdoteService.getAll().then( anecdotes => {
    //   anecdotes.forEach(anecdote => {
    //     dispatch(AddAnec(anecdote))
    //   })
    // }
    // )
    dispatch(initializeAnec())
  }, [dispatch])
  // const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))
  // const dispatch = useDispatch()

  // const vote = (id) => {
  //   console.log('voted ' + id)
  //   dispatch(voteto(id))
  // }
  
  // const newAnc = (e) => {
  //   e.preventDefault()
  //   console.log('newAnc ' + e.target.content.value )
  //   dispatch(NewAnc(e.target.content.value))
  // }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      {/* {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnc}>
        <div><input name='content' /></div>
        <button>create</button>
      </form> */}
    </div>
  )
}

export default App
import { useSelector, useDispatch } from 'react-redux';
import { voteAnc  } from '../reducers/anecdoteReducer'
import {  setNotif } from '../reducers/notifReducer';


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log(state)
        if (state.filter === null){
            return([...state.anecdotes].sort((a,b) => b.votes - a.votes))
        }else{
            console.log(state.filter)
            return(
                [...state.anecdotes].filter(ancObj =>
                    ancObj.content.match(state.filter)
                ).sort((a,b) => b.votes - a.votes)
            )
        }
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log(anecdote)
        dispatch(voteAnc(anecdote))
        dispatch(setNotif('You voted for ' + anecdote.content, 2))
        // console.log('voted ' + id + title)
        // dispatch(voteto(id))
        // dispatch(voteNotif('you voted for: '+ title))
        // setTimeout(
        //     () => {
        //         console.log('in timeout')
        //         dispatch(clearState())
        //     }, 2000
        // )
    }



    return (
        <div>
            {anecdotes.map(anecdote => <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}
export default AnecdoteList

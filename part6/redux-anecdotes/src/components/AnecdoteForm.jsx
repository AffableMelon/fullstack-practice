// import { NewAnc } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {  setNotif } from '../reducers/notifReducer'
import { createAnc } from '../reducers/anecdoteReducer'
// import anecdoteService from '../service/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const newAnc = async (e) => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.content.value = ''
        dispatch(createAnc(content))
        dispatch(setNotif('Created ' + content, 2.5))
        
    }


    return(
        <div>
            <h2>Create new</h2>
            <form onSubmit={newAnc}>
                <div><input name='content' /></div>
                <button>create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm
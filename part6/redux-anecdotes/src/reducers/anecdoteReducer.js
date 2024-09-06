// import { computeHeadingLevel } from "@testing-library/react"
import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from "../service/anecdoteService"

/* eslint-disable no-case-declarations */
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


// export const voteto = (id) => {
//   return({
//     type: 'VOTE',
//     payload: id
//   }
//   )
// }

// export const NewAnc = (content) => {
//   return({
//     type: 'NEW_ANC',
//     payload:{
//       content: content,
//     }
//   })
// }


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}



const initialState = []


const ancSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteto(state, action){
      const id = action.payload
      const voteANC = state.find(anc =>  anc.id === id)
      const votedANC = {
        ...voteANC,
        votes: voteANC.votes + 1
      }
      console.log(current(state))
      return(state.map(anc => {
        return anc.id === id ? votedANC : anc
      }))
    },
    NewAnc(state, action){
      console.log(action)
      return([...state, action.payload])
    },
    AddAnec(state, action) {
      state.push(action.payload)
    }
  }
})


export const initializeAnec = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.forEach(anecdote => {
      dispatch(AddAnec(anecdote))
    })
  }
}

export const createAnc = anc => {
  return async dispatch => {
    const ancObj = asObject(anc)
    await anecdoteService.createNew(ancObj)
    dispatch(AddAnec(ancObj))
  }
}

export const voteAnc = anc => {
  return async dispatch => {
    await anecdoteService.updateAnc({...anc, votes: anc.votes + 1})
    dispatch(voteto(anc.id))
  }
}


// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   // let { content, id, votes} = state
//   switch(action.type){
//     case 'VOTE':
//       const id = action.payload
//       const voteANC = state.find(anc =>  anc.id === id)
//       const votedANC = {
//         ...voteANC,
//         votes: voteANC.votes + 1
//       }
//       console.log(votedANC)
//       return(state.map(anc => {
//         return anc.id === id ? votedANC : anc
//       }))
//     case 'NEW_ANC':
//       const newAnc = asObject(action.payload.content)
//       return([...state, newAnc])
//     default:
//       return(state)    
//   }

// }


export const {NewAnc, voteto, AddAnec} = ancSlice.actions
export default ancSlice.reducer
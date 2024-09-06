import { createSlice } from "@reduxjs/toolkit"



const initialState = null
const filtSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChnage(state, action){
            // console.log(current(state))
            return( state === 'ALL' ? '' : action.payload)
        }
    }
})

// const filterReducer = (state = 'ALL', action) => {
//     console.log(action)
//     switch(action.type){
//         case 'SET_FILTER': 
//             return (action.payload)
//         default:
//             return state
//     }
// }


// export const filterChnage = filter => {
//     return({
//         type: 'SET_FILTER',
//         payload: filter
//     })
// }

export const { filterChnage } = filtSlice.actions
export default filtSlice.reducer
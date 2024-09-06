import { createSlice } from "@reduxjs/toolkit";


const initialState = null

const notfSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        NewNotif (state, action){
            console.log(action)
            return (state = action.payload )
        }, 
        clearState (state , action){
            console.log(action)
            return null
        }
    }
})

export const setNotif = (message, time) => {
    return dispatch => {
        console.log(message)
        dispatch(NewNotif(message))
        setTimeout( () => {
            dispatch(clearState())
        }, time * 1000)
    }
}

export const { NewNotif, clearState} = notfSlice.actions
export default notfSlice.reducer
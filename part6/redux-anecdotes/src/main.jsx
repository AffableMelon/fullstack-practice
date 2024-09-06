import ReactDOM from 'react-dom/client'


// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'


import App from './App'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifReducer from './reducers/notifReducer'
// import anecdoteService from './service/anecdoteService'
// import { AddAnec } from './reducers/anecdoteReducer'

// const combination = combineReducers({
//   anecdotes: reducer,
//   filter: filterReducer
// })

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer,
    notif: notifReducer
  }
})


// anecdoteService.getAll().then( anecdotes => {
//   anecdotes.forEach(anecdote => {
//     store.dispatch(AddAnec(anecdote))
//   })
// }
// )



console.log(store.getState())



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
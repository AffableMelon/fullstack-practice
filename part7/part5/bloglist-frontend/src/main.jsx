import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";

import blogreducer from "./reducers/blogreducer";
import userreducer from "./reducers/userreducer";
import notifReducer from "./reducers/notifreducer";
import userSreducer from "./reducers/userSreducer";
// import anecdoteService from './service/anecdoteService'
// import { AddAnec } from './reducers/anecdoteReducer'

// const combination = combineReducers({
//   anecdotes: reducer,
//   filter: filterReducer
// })

const store = configureStore({
  reducer: {
    blogs: blogreducer,
    user: userreducer,
    notif: notifReducer,
    users: userSreducer,
  },
});

// anecdoteService.getAll().then( anecdotes => {
//   anecdotes.forEach(anecdote => {
//     store.dispatch(AddAnec(anecdote))
//   })
// }
// )

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

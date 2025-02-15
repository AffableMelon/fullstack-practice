import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

// styles
import "./output.css";

const store = createStore(reducer);

const App = () => {
  const sendout = (value) => {
    store.dispatch({
      type: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="mb-4 text-3xl font-bold text-cyan-900">
        Rate the Student Cafe!
      </h2>
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg border-2 border-cyan-900">
        <div className="grid grid-cols-2 gap-4">
          <button
            className="p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => sendout("GOOD")}
          >
            Good
          </button>
          <div className="flex items-center justify-center text-lg font-semibold text-gray-700">
            {store.getState().good}
          </div>

          <button
            className="p-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
            onClick={() => sendout("OK")}
          >
            OK
          </button>
          <div className="flex items-center justify-center text-lg font-semibold text-gray-700">
            {store.getState().ok}
          </div>

          <button
            className="p-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={() => sendout("BAD")}
          >
            Bad
          </button>
          <div className="flex items-center justify-center text-lg font-semibold text-gray-700">
            {store.getState().bad}
          </div>
        </div>

        <button
          className="w-full mt-6 p-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
          onClick={() => sendout("ZERO")}
        >
          Reset Stats
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);

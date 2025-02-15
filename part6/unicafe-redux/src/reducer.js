const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  const currentState = { ...state };
  switch (action.type) {
    case "GOOD": {
      currentState.good += 1;
      return currentState;
    }
    case "OK": {
      currentState.ok += 1;
      return currentState;
    }
    case "BAD": {
      currentState.bad += 1;
      return currentState;
    }
    case "ZERO":
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;

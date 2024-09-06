const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let {good, ok , bad} = state
  switch (action.type) {
    case 'GOOD':
      good += 1
      state = {
        good: good,
        ok: ok,
        bad: bad
      }
      return state
    case 'OK':
      ok += 1
      state = {
        good: good,
        ok: ok,
        bad: bad
      }
      return state
    case 'BAD':
      bad += 1
      state = {
        good: good,
        ok: ok,
        bad: bad
      }
      return state
    case 'ZERO':
      // state = {
      //   good: 0,
      //   bad: 0,
      //   ok: 0
      // }

      return initialState
    default: return state
  }
  
}

export default counterReducer

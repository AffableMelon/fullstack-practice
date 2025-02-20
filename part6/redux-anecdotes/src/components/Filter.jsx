import {filterChnage} from "../reducers/filterReducer"
import { useDispatch } from "react-redux"



const Filter = () => {

    const dispatch = useDispatch()
    const handleChange = (event) => {
      console.log('changed with ' + event.target.value)
      dispatch(filterChnage(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter
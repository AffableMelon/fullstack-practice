import React, { useContext } from "react"
// import Not from "../NotifContext"
import NotificationContext from "../NotifContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const message = useContext(NotificationContext)
  
  if (!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification

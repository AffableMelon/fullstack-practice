import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notif);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div>
      {notification ? <div style={style}> {notification} </div> : <div></div>}
    </div>
  );
};

export default Notification;

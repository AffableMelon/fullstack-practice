import { useState, forwardRef, useImperativeHandle } from "react";
import propTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired,
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}

        <button onClick={toggleVisibility}>{props.hiddenButtonLabel}</button>
      </div>
    </div>
  );
});
Togglable.displayName = "Togglable";
export default Togglable;

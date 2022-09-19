import React from "react";
import './Buttons.css';

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button type="submit" className="button">Submit</button>
        <button type="reset" className="button">Reset</button>
      </div>
    );
  }
}

export default Buttons;
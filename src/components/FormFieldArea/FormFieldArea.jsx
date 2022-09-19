import React from "react";
import './FormFieldArea.css';

class FormFieldArea extends React.Component {
  render() {
    const { id, rows, title, placeholder } = this.props;

    return (
      <div className="form__field">
        <label htmlFor={id} className="form__label">
          {title}
        </label>
        <textarea
          className="form__area"
          name={title.toLowerCase()}
          id={id}
          rows={rows}
          placeholder={`${placeholder}...`}
       ></textarea>
      </div>
    );
  }
}

export default FormFieldArea;

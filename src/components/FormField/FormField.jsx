import React from "react";
import './FormField.css';

class FormField extends React.Component {
  render() {
    const { type, id, title } = this.props;

    return (
      <div className="form__field">
        <label htmlFor={id} className="form__label">
          {title}
        </label>
        <input
          className="form__input"
          type={type}
          id={id}
          name={title.toLowerCase()}
          placeholder={title}
        />
      </div>
    );
  }
}

export default FormField;
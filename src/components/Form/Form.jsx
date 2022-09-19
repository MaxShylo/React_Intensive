import React from "react";
import './Form.css';

import FormField from "../FormField/FormField";
import FormFieldArea from "../FormFieldArea/FormFieldArea";
import Buttons from "../Buttons/Buttons";

class Form extends React.Component {
  render() {
    return (
      <form action="/" className="form">
        <h1 className="form__title">Create a questionnaire</h1>

        <FormField type="text" id="form-name" title="Name" />
        <FormField type="text" id="form-surname" title="Surname" />
        <FormField type="date" id="form-date" title="Date of Birth" />
        <FormField type="tel" id="form-tel" title="Telephone" />
        <FormField type="text" id="form-website" title="Website" />

        <FormFieldArea
          id="about"
          rows="7"
          title="About myself"
          placeholder="About myself"
        />
        <FormFieldArea
          id="form-technology"
          rows="7"
          title="Technology stack"
          placeholder="Stacks"
        />
        <FormFieldArea
          id="from-projects"
          rows="7"
          title="Description of the latest project"
          placeholder="Description"
        />

        <Buttons />
      </form>
    );
  }
}

export default Form;
import { Component } from 'react';
import './Questionnaire.css';

export class Questionnaire extends Component {
  render() {
    const { userData } = this.props;
    const {
      name,
      surname,
      date,
      telephone,
      website,
      about,
      technology,
      project,
    } = userData;

    return (
      <div className="questionnaire">
        <h1 className="questionnaire__title">
          {`${name} ${surname}`}
        </h1>

        <div className="questionnaire__field">
          <p className="questionnaire__field-title">
            Date of Birth:
          </p>
          <p className="questionnaire__field-data">
            {date}
          </p>
        </div>

        <div className="questionnaire__field">
          <p className="questionnaire__field-title">
            Telephone:
          </p>
          <p className="questionnaire__field-data">
            {telephone}
          </p>
        </div>

        <div className="questionnaire__field">
          <p className="questionnaire__field-title">
            Website:
          </p>
          <p className="questionnaire__field-data">
            {website}
          </p>
        </div>

        <div className="questionnaire__field">
          <p className="questionnaire__field-title">
            About myself:
          </p>
          <p className="questionnaire__field-data">
            {about}
          </p>
        </div>

        <div className="questionnaire__field">
          <p className="questionnaire__field-title">
            Technology stack:
          </p>
          <p className="questionnaire__field-data">
            {technology}
          </p>
        </div>

        <div className="questionnaire__field">
          <p className="questionnaire__field-title">
            Description of the latest project:
          </p>
          <p className="questionnaire__field-data">
            {project}
          </p>
        </div>

      </div>
    )
  }
}

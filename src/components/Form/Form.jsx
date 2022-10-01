import React from 'react';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import './Form.css';

import { Questionnaire } from '../Questionnaire';

class Form extends React.Component {
  state = {
    name: '',
    surname: '',
    date: '',
    telephone: '',
    website: '',
    about: '',
    technology: '',
    project: '',
    rows: 7,
    maxLength: 600,
    availableCharForAbout: '',
    availableCharForTechnology: '',
    availableCharForProject: '',
    exceededMessage: 'Exceeded character limit in field!!!',
    isEmpty: false,
    isEmptyMessage: '',
    errorMessageForName: '',
    errorMessageForSurname: '',
    errorMessageForTel: '',
    errorMessageForWebsite: '',
    isQuestionnaireReady: false,
  }

  validation = (event) => {
    event.preventDefault();

    const {
      name,
      surname,
      date,
      telephone,
      website,
      about,
      technology,
      project,
      isEmptyMessage,
      errorMessageForName,
      errorMessageForSurname,
      errorMessageForTel,
      errorMessageForWebsite,
    } = this.state;

    const isEmpty = !name || !surname || !date
      || !telephone || !website || !about
      || !technology || !project;

    if (isEmpty) {
      this.setState(() => ({
        isEmpty: true,
        isEmptyMessage: 'Empty field!!! Please, provide correct data!',
      }));
    } else {
      this.setState(() => ({
        isEmpty: false,
        isEmptyMessage: '',
      }));
    }

    if (!this.isFirstUpperCase(name)) {
      this.setState(() => ({ errorMessageForName: 'First letter not in upperCase!!!' }));
      throw new Error(errorMessageForName);
    } else {
      this.setState(() => ({ errorMessageForName: '' }));
    }

    if (!this.isFirstUpperCase(surname)) {
      this.setState(() => ({ errorMessageForSurname: 'First letter not in upperCase!!!' }));
      throw new Error(errorMessageForSurname);
    } else {
      this.setState(() => ({ errorMessageForSurname: '' }));
    }

    if (telephone.length < 12) {
      this.setState(() => ({ errorMessageForTel: 'Number should have 12 digits!!!' }));
      throw new Error(errorMessageForTel);
    } else {
      this.setState(() => ({ errorMessageForTel: '' }));
    }

    if (!website.startsWith('https://')) {
      this.setState(() => ({ errorMessageForWebsite: 'Website should start with "https://" !!!' }));
      throw new Error(errorMessageForWebsite);
    } else {
      this.setState(() => ({ errorMessageForWebsite: '' }));
    }

    if (!about || !technology || !project) {
      throw new Error(isEmptyMessage);
    }

    this.isReady();
  }

  isFirstUpperCase = (string) => {
    if (string[0] !== string[0].toUpperCase()) {

      return false;
    }

    return true;
  }

  handleChange = (event) => {
    const { name, value, className } = event.target;

    this.setState(() => ({
      [name]: value.trim(),
    }));

    if (className.includes('form__area')) {
      this.setState((state) => {
        const { maxLength } = state;

        if (className.includes('form__area-about')) {
          return { availableCharForAbout: maxLength - value.length };
        }

        if (className.includes('form__area-technology')) {
          return { availableCharForTechnology: maxLength - value.length };
        }

        if (className.includes('form__area-project')) {
          return { availableCharForProject: maxLength - value.length };
        }
      })
    }
  }

  isReady = () => {
    this.setState(() => ({ isQuestionnaireReady: true }));
  }

  reset = () => {
    this.setState(() => (
      {
        name: '',
        surname: '',
        date: '',
        telephone: '',
        website: '',
        about: '',
        technology: '',
        project: '',
        rows: 7,
        maxLength: 600,
        availableCharForAbout: '',
        availableCharForTechnology: '',
        availableCharForProject: '',
        exceededMessage: 'Exceeded character limit in field!!!',
        isEmpty: false,
        isEmptyMessage: '',
        errorMessageForName: '',
        errorMessageForSurname: '',
        errorMessageForTel: '',
        errorMessageForWebsite: '',
        isQuestionnaireReady: false,
      }
    ))
  }

  render() {
    const {
      name,
      surname,
      date,
      telephone,
      website,
      about,
      technology,
      project,
      rows,
      maxLength,
      availableCharForAbout,
      availableCharForTechnology,
      availableCharForProject,
      exceededMessage,
      isEmpty,
      isEmptyMessage,
      errorMessageForName,
      errorMessageForSurname,
      errorMessageForTel,
      errorMessageForWebsite,
      isQuestionnaireReady,
    } = this.state;

    return (!isQuestionnaireReady ? (
      <form
        action="/"
        method='post'
        className="form"
        onSubmit={this.validation}
      >
        <h1 className="form__title">Create a questionnaire</h1>

        <div className="form__field">
          <label htmlFor="form-name" className="form__label">
            Name
          </label>
          <input
            className={classnames(
              'form__input',
              { 'warning': (isEmpty && !name) || errorMessageForName },
            )}
            type="text"
            id="form-name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChange}
          />

          {(isEmpty && !name) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {(errorMessageForName && name) && (
            <p class="warning-message">
              {errorMessageForName}
            </p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="form-surname" className="form__label">
            Surname
          </label>
          <input
            className={classnames(
              'form__input',
              { 'warning': (isEmpty && !surname) || errorMessageForSurname },
            )}
            type="text"
            id="form-surname"
            name="surname"
            placeholder="Surname"
            value={surname}
            onChange={this.handleChange}
          />

          {(isEmpty && !surname) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {(errorMessageForSurname && surname) && (
            <p class="warning-message">
              {errorMessageForSurname}
            </p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="form-date" className="form__label">
            Date of Birth
          </label>
          <input
            className={classnames(
              'form__input',
              { 'warning': isEmpty && !date },
            )}
            type="date"
            id="form-date"
            name="date"
            placeholder="Surname"
            value={date}
            onChange={this.handleChange}
          />

          {(isEmpty && !date) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="form-tel" className="form__label">
            Telephone
          </label>
          <InputMask
            className={classnames(
              'form__input',
              { 'warning': (isEmpty && !telephone) || errorMessageForTel },
            )}
            mask="9-9999-99-99"
            maskChar={null}
            type="tel"
            id="form-tel"
            name="telephone"
            placeholder="Telephone"
            value={telephone}
            onChange={this.handleChange}
          />

          {(isEmpty && !telephone) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {(errorMessageForTel && telephone) && (
            <p class="warning-message">
              {errorMessageForTel}
            </p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="form-website" className="form__label">
            Website
          </label>
          <input
            className={classnames(
              'form__input',
              { 'warning': (isEmpty && !website) || errorMessageForWebsite },
            )}
            type="tel"
            id="form-website"
            name="website"
            placeholder="Website"
            value={website}
            onChange={this.handleChange}
          />

          {(isEmpty && !website) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {(errorMessageForWebsite && website) && (
            <p class="warning-message">
              {errorMessageForWebsite}
            </p>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="form-about" className="form__label">
            About myself
          </label>
          <textarea
            className={classnames(
              'form__area',
              'form__area-about',
              { 'warning': (isEmpty && !about) || availableCharForAbout === 0 },
            )}
            name="about"
            id="form-about"
            rows={rows}
            placeholder="About myself..."
            value={about}
            onChange={this.handleChange}
            maxLength={maxLength}
          />

          {(isEmpty && !about) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {about && (availableCharForAbout > 0
            ? (
              <span className='form__area-counter'>
                {`${availableCharForAbout}/${maxLength}`}
              </span>
            )
            : (
              <p class="warning-message">
                {exceededMessage}
              </p>
            ))
          }
        </div>

        <div className="form__field">
          <label htmlFor="form-technology" className="form__label">
            Technology stack
          </label>
          <textarea
            className={classnames(
              'form__area',
              'form__area-technology',
              { 'warning': (isEmpty && !technology) || availableCharForTechnology === 0 },
            )}
            name="technology"
            id="form-technology"
            rows={rows}
            placeholder="Stacks..."
            value={technology}
            onChange={this.handleChange}
            maxLength={maxLength}
          />

          {(isEmpty && !technology) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {technology && (availableCharForTechnology > 0
            ? (
              <span className='form__area-counter'>
                {`${availableCharForTechnology}/${maxLength}`}
              </span>
            )
            : (
              <p class="warning-message">
                {exceededMessage}
              </p>
            ))
          }
        </div>

        <div className="form__field">
          <label htmlFor="form-projects" className="form__label">
            Description of the latest project
          </label>
          <textarea
            className={classnames(
              'form__area',
              'form__area-project',
              { 'warning': (isEmpty && !project) || availableCharForProject === 0 },
            )}
            name="project"
            id="form-projects"
            rows={rows}
            placeholder="Description..."
            value={project}
            onChange={this.handleChange}
            maxLength={maxLength}
          />

          {(isEmpty && !project) && (
            <p class="warning-message">{isEmptyMessage}</p>
          )}

          {project && (availableCharForProject > 0
            ? (
              <span className='form__area-counter'>
                {`${availableCharForProject}/${maxLength}`}
              </span>
            )
            : (
              <p class="warning-message">
                {exceededMessage}
              </p>
            ))
          }
        </div>

        <div className="buttons">
          <button
            type="submit"
            className="button"
          >
            Submit
          </button>
          <button
            type="reset"
            className="button"
            onClick={this.reset}
          >
            Reset
          </button>
        </div>
      </form>
    )
      : <Questionnaire userData={this.state} />
    )
  }
}

export default Form;
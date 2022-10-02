import React, { useState } from 'react';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import './Form.css';

import { Questionnaire } from '../Questionnaire';

const Form = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [date, setDate] = useState('');
  const [telephone, setTel] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setUserDescription] = useState('');
  const [technology, setTechnologyDescription] = useState('');
  const [project, setProjectDescription] = useState('');
  const [availableCharAbout, setAvailableCharAbout] = useState('');
  const [availableCharTech, setAvailableCharTech] = useState('');
  const [availableCharProject, setAvailableCharProject] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [errName, setErrName] = useState(false);
  const [errSurname, setErrSurname] = useState(false);
  const [errTel, setErrTel] = useState(false);
  const [errWebsite, setErrWebsite] = useState('');
  const [isQuestionnaireReady, setQuestionnaire] = useState(false);

  const textAreaRows = 7;
  const maxLengthSymbols = 600;
  const exceededMessage = 'Exceeded character limit in field!!!';
  const emptyMessage = 'Empty field!!! Please, provide correct data!';
  const errText = 'First letter not in upperCase!!!';
  const errMessageTel = 'Number should have 12 digits!!!';
  const errMessageWebsite = 'Website should start with "https://" !!!'

  const validation = (event) => {
    event.preventDefault();

    const isEmpty = !name || !surname || !date
      || !telephone || !website || !about
      || !technology || !project;

    if (isEmpty) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    if (!isFirstUpperCase(name)) {
      setErrName(true);
      throw new Error(errText);
    } else {
      setErrName(false);
    }

    if (!isFirstUpperCase(surname)) {
      setErrSurname(true);
      throw new Error(errText);
    } else {
      setErrSurname(false);
    }

    if (telephone.length < 12) {
      setErrTel(true);
      throw new Error(errMessageTel);
    } else {
      setErrTel(false);
    }

    if (!website.startsWith('https://')) {
      setErrWebsite(true);
      throw new Error(errMessageWebsite);
    } else {
      setErrWebsite(false);
    }

    if (!about || !technology || !project) {
      throw new Error(emptyMessage);
    }

    isReady();
  }

  const isFirstUpperCase = (string) => {
    if (string[0] !== string[0].toUpperCase()) {

      return false;
    }

    return true;
  }

  const handleChange = (event) => {
    const { name, value, className } = event.target;
    const inputData = value.trim();

    switch (name) {
      case 'name':
        setName(inputData);
        break;
      case 'surname':
        setSurname(inputData);
        break;
      case 'date':
        setDate(inputData);
        break;
      case 'telephone':
        setTel(inputData);
        break;
      case 'website':
        setWebsite(inputData);
        break;
      case 'about':
        setUserDescription(inputData);
        break;
      case 'technology':
        setTechnologyDescription(inputData);
        break;
      case 'project':
        setProjectDescription(inputData);
        break;
      default:
    }

    if (className.includes('form__area')) {
      if (className.includes('form__area-about')) {
        setAvailableCharAbout(maxLengthSymbols - value.length);
      }

      if (className.includes('form__area-technology')) {
        setAvailableCharTech(maxLengthSymbols - value.length);
      }

      if (className.includes('form__area-project')) {
        setAvailableCharProject(maxLengthSymbols - value.length);
      }
    }
  }

  const isReady = () => {
    setQuestionnaire(true);
  }

  const reset = () => {
    setName('');
    setSurname('');
    setDate('');
    setTel('');
    setWebsite('');
    setUserDescription('');
    setTechnologyDescription('');
    setProjectDescription('');
    setAvailableCharAbout('');
    setAvailableCharTech('');
    setAvailableCharProject('');
    setIsEmpty(false);
    setErrName(false);
    setErrSurname(false);
    setErrTel(false);
    setErrWebsite('');
    setQuestionnaire(false);
  }

  return (!isQuestionnaireReady ? (
    <form
      action="/"
      method='post'
      className="form"
      onSubmit={validation}
    >
      <h1 className="form__title">Create a questionnaire</h1>

      <div className="form__field">
        <label htmlFor="form-name" className="form__label">
          Name
        </label>
        <input
          className={classnames(
            'form__input',
            { 'warning': (isEmpty && !name) || errName },
          )}
          type="text"
          id="form-name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
        />

        {(isEmpty && !name) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {(errName && name) && (
          <p class="warning-message">
            {errText}
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
            { 'warning': (isEmpty && !surname) || errSurname },
          )}
          type="text"
          id="form-surname"
          name="surname"
          placeholder="Surname"
          value={surname}
          onChange={handleChange}
        />

        {(isEmpty && !surname) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {(errSurname && surname) && (
          <p class="warning-message">
            {errText}
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
          onChange={handleChange}
        />

        {(isEmpty && !date) && (
          <p class="warning-message">{emptyMessage}</p>
        )}
      </div>

      <div className="form__field">
        <label htmlFor="form-tel" className="form__label">
          Telephone
        </label>
        <InputMask
          className={classnames(
            'form__input',
            { 'warning': (isEmpty && !telephone) || errTel },
          )}
          mask="9-9999-99-99"
          maskChar={null}
          type="tel"
          id="form-tel"
          name="telephone"
          placeholder="Telephone"
          value={telephone}
          onChange={handleChange}
        />

        {(isEmpty && !telephone) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {(errTel && telephone) && (
          <p class="warning-message">
            {errMessageTel}
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
            { 'warning': (isEmpty && !website) || errWebsite },
          )}
          type="tel"
          id="form-website"
          name="website"
          placeholder="Website"
          value={website}
          onChange={handleChange}
        />

        {(isEmpty && !website) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {(errWebsite && website) && (
          <p class="warning-message">
            {errMessageWebsite}
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
            { 'warning': (isEmpty && !about) || availableCharAbout === 0 },
          )}
          name="about"
          id="form-about"
          rows={textAreaRows}
          placeholder="About myself..."
          value={about}
          onChange={handleChange}
          maxLength={maxLengthSymbols}
        />

        {(isEmpty && !about) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {about && (availableCharAbout > 0
          ? (
            <span className='form__area-counter'>
              {`${availableCharAbout}/${maxLengthSymbols}`}
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
            { 'warning': (isEmpty && !technology) || availableCharTech === 0 },
          )}
          name="technology"
          id="form-technology"
          rows={textAreaRows}
          placeholder="Stacks..."
          value={technology}
          onChange={handleChange}
          maxLength={maxLengthSymbols}
        />

        {(isEmpty && !technology) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {technology && (availableCharTech > 0
          ? (
            <span className='form__area-counter'>
              {`${availableCharTech}/${maxLengthSymbols}`}
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
            { 'warning': (isEmpty && !project) || availableCharProject === 0 },
          )}
          name="project"
          id="form-projects"
          rows={textAreaRows}
          placeholder="Description..."
          value={project}
          onChange={handleChange}
          maxLength={maxLengthSymbols}
        />

        {(isEmpty && !project) && (
          <p class="warning-message">{emptyMessage}</p>
        )}

        {project && (availableCharProject > 0
          ? (
            <span className='form__area-counter'>
              {`${availableCharProject}/${maxLengthSymbols}`}
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
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </form>
  )
    : <Questionnaire
      userData={
        {
          name,
          surname,
          date,
          telephone,
          website,
          about,
          technology,
          project,
        }}
    />
  )
}

export default Form;

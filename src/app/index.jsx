import React, { useState } from 'react';
import './styles.css'
import TextField from './text-field';

function isRequired(value) { 
  return value.length > 0 ? '' : 'Cannot be blank.';
}

function isEmail(value) {

  const ai = value.indexOf("@");
  const gdi = value
    .split("")
    .reduce((acc, char, i) => char === "." ? i : acc, 0);

  return (ai > -1 && gdi > ai)  ? '' : 'Must have a valid email.';
}

const defaultValues = {
  name: '', 
  email: ''
};

const defaultErrors = {
    name: [],
    email: [],
  }

export default function App() {
  const [ values, setValues ] = useState(defaultValues); 
  const [ errors, setErrors ] = useState(defaultErrors ); 

  return <div className="container">
   
    <TextField 
      value={values.name}
      label='Name'
      name='name'
      onChange={val => {
        const name = val;
        setValues(prev => ({ ...prev,name }))}
      }
      validations={[isRequired]}
      errors={errors.name}
      setErrors={setErrors}
    />

    <TextField 
      value={values.email}
      label='Email'
      name='email'
      onChange={val => {
        const email = val;
        setValues(prev => ({ ...prev,email }))}
      }
      validations={[isRequired, isEmail]}
      errors={errors.email}
      setErrors={setErrors}
    />
  </div>
  
}

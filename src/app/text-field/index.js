import React, { useState, useRef } from 'react';

export default function TextField({
    name,
    label,
    value, 
    setErrors, 
    errors, 
    onChange, 
    validations,
    }) {
    const [ focused, setFocused ] = useState(false);
    const inputRef = useRef(null);

    console.log(validations, "TEST")

    function validate(validations) {
        setErrors( prev => ({
            ...prev,
            [name]: validations
                .map(errorsFor => errorsFor(value))
                .filter(errorMsg => errorMsg.length > 0),
        })        
        );
    }

    return <div>
        <div className={`form-field ${focused ? 'is-focused' : ''} ${value.length > 0 ? 'has-value' : ''}`}>
        <div className="control">
            <label 
                htmlFor="email"
                onClick={() => inputRef.current.focus()}
            >{label}</label>
            <input 
                ref={inputRef}
                type="text" 
                name={name} 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => { 
                setFocused(false);
                validate(validations) 
            }}
            />
        </div>
        {
            errors.length > 0 
            ? <div className="has-error">{errors.join(", ")}</div>
            : null
        }
        </div>
    </div>;
}

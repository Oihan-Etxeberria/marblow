import React, { useState, useEffect } from 'react';

const FIELD_CONFIG = {
  name: {
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name',
    required: true
  },
  email: {
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter email',
    required: true,
    helpText: "We'll never share your email with anyone else."
  },
  message: {
    label: 'Message',
    type: 'textarea',
    placeholder: 'Write your message here...',
    rows: 5,
    required: true,
    className: 'msg'
  },
  terms: {
    label: 'Check me out',
    type: 'checkbox'
  },
  username: {
    label: 'Name or email',
    type: 'text',
    placeholder: 'Enter you name or email',
    required: true
  },
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    helpText: "Minimum 8 characters"
  },
  password_confirmation: {
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true
  }
};

const Form = ({ 
  fields = [], 
  onSubmit, 
  title, 
  secondaryButton, 
  submitText = "Send", 
  className = "", 
  serverErrors = {},
  clientValidation = true
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Actualizar errores cuando llegan del servidor
  useEffect(() => {
    if (serverErrors) {
      setErrors(prev => ({
        ...prev,
        ...serverErrors
      }));
    }
  }, [serverErrors]);

  const validateField = (fieldName, value) => {
    const config = FIELD_CONFIG[fieldName];
    
    if (!clientValidation) return null;
    
    if (config.required && !value) {
      return `${config.label} is required`;
    }
    
    if (config.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    // Validación especial para confirmación de contraseña
    if (fieldName === 'password_confirmation' && value) {
      if (value !== formData.password) {
        return 'Passwords do not match';
      }
    }
    
    // Validación de longitud de contraseña
    if (fieldName === 'password' && value && value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Solo validar si clientValidation es true
    if (clientValidation) {
      // Si estamos cambiando la contraseña y hay confirmación, validar ambas
      if (name === 'password' && formData.password_confirmation) {
        const confirmError = validateField('password_confirmation', formData.password_confirmation);
        setErrors(prev => ({
          ...prev,
          password_confirmation: confirmError
        }));
      }

      const error = validateField(name, fieldValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      // Si no hay validación del cliente, limpiar errores de este campo
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Solo validar del lado del cliente si clientValidation es true
    if (clientValidation) {
      const newErrors = {};
      let hasErrors = false;

      fields.forEach(fieldName => {
        const value = formData[fieldName];
        const error = validateField(fieldName, value);
        if (error) {
          newErrors[fieldName] = error;
          hasErrors = true;
        }
      });

      setErrors(newErrors);

      if (hasErrors) {
        return; // Detener envío si hay errores
      }
    }

    // Si llegamos aquí, es porque:
    // 1. clientValidation es false (no validamos, enviamos siempre)
    // 2. clientValidation es true y no hubo errores
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`contact-form ${className}`}
      noValidate
    >
      {title && <h1 className="text-center">{title}</h1>}
      
      {fields.map((fieldName) => {
        const field = FIELD_CONFIG[fieldName];
        if (!field) return null;
        
        const serverError = serverErrors[fieldName];
        const clientError = errors[fieldName];
        
        return (
          <div key={fieldName} className={`form-group my-2 ${field.className || ''}`}>
            {field.type === 'checkbox' ? (
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={fieldName}
                  name={fieldName}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={fieldName}>
                  {field.label}
                </label>
              </div>
            ) : (
              <>
                <label 
                  className={field.required ? 'required-label' : ''} 
                  htmlFor={fieldName}
                >
                  {field.label}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    className={`form-control ${serverError ? 'is-invalid' : ''}`}
                    id={fieldName}
                    name={fieldName}
                    rows={field.rows || 3}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    value={formData[fieldName] || ''}
                  />
                ) : (
                  <input
                    type={field.type}
                    className={`form-control ${serverError ? 'is-invalid' : ''}`}
                    id={fieldName}
                    name={fieldName}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    value={formData[fieldName] || ''}
                    aria-describedby={field.helpText ? `${fieldName}Help` : undefined}
                  />
                )}
                
                {field.helpText && (
                  <small id={`${fieldName}Help`} className="form-text text-muted">
                    {field.helpText}
                  </small>
                )}
                
                {(clientError || serverError) && (
                  <small className="form-text text-danger">
                    {clientError || serverError}
                  </small>
                )}
              </>
            )}
          </div>
        );
      })}
      
      <div className={secondaryButton ? "regist" : ""}>
        {secondaryButton && (
          <a href={secondaryButton.href} className="btn btn-secondary">
            {secondaryButton.text}
          </a>
        )}
        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default Form;
import React from 'react'
import './FormField.css'

interface FormFieldProps {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'textarea'
  error?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  error,
}) => {
  return (
    <div className="ticket-form__field">
      <label htmlFor={id} className="ticket-form__label">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={`ticket-form__textarea ${error ? 'ticket-form__textarea--error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          className={`ticket-form__input ${error ? 'ticket-form__input--error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <div className="ticket-form__error">{error}</div>}
    </div>
  )
}

export default FormField

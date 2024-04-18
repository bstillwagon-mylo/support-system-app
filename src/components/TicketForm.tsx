import React, { useState, useEffect } from 'react'
import FormField from './FormField'
import 'cross-fetch/polyfill'
import fetch from 'cross-fetch'
import { isValidEmail } from '../utils/helpers'

// In your code
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

interface TicketFormProps {
  onSubmitSuccess?: () => void
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmitSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    description?: string
  }>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    if (showSuccessMessage) {
      timeout = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [showSuccessMessage])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newErrors: { name?: string; email?: string; description?: string } =
      {}

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setServerError(null)
      return
    }

    try {
      const response = await fetch(`${backendUrl}/api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, description }),
      })

      if (response.ok) {
        setShowSuccessMessage(true)
        if (onSubmitSuccess) {
          onSubmitSuccess()
        }

        // Reset the form fields and errors
        setName('')
        setEmail('')
        setDescription('')
        setErrors({})
        setServerError(null)
      } else {
        const errorData = await response.json()
        console.error('Error submitting ticket:', errorData)
        setErrors({})
        setServerError(
          'An error occurred while submitting the ticket. Please try again later.'
        )
      }
    } catch (error) {
      console.error('Error submitting ticket:', error)
      setErrors({})
      setServerError(
        'An error occurred while submitting the ticket. Please try again later.'
      )
    }
  }

  const handleInputChange = () => {
    setShowSuccessMessage(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="ticket-form">
        <FormField
          label="Name"
          id="name"
          value={name}
          onChange={(value) => {
            setName(value)
            handleInputChange()
          }}
          error={errors.name}
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value)
            handleInputChange()
          }}
          error={errors.email}
        />
        <FormField
          label="Description"
          id="description"
          type="textarea"
          value={description}
          onChange={(value) => {
            setDescription(value)
            handleInputChange()
          }}
          error={errors.description}
        />
        {serverError && <div className="ticket-form__error">{serverError}</div>}
        <button type="submit" className="ticket-form__submit">
          Submit
        </button>
        {showSuccessMessage && (
          <div className="ticket-form__success">
            Ticket submitted successfully!
          </div>
        )}
      </form>
    </div>
  )
}

export default TicketForm

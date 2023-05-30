import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const form = () => {
    const [formState, setFormState] = useState({})

    const {
        form,
        handleSubmit,
        setValue,
    } = useForm()

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })

    const onSubmit = (data) => {
        // Validate the form data
        const errors = validationSchema.validate(data)

        if (!errors.length) {
            // Submit the form data to the backend
        } else {
            // Show the errors to the user
            setFormState({ errors })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={formState.name}
                onChange={(e) => setValue('name', e.target.value)}
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={formState.email}
                onChange={(e) => setValue('email', e.target.value)}
            />

            <input
                type='password'
                placeholder='Password'
                name='password'
                value={formState.password}
                onChange={(e) => setValue('password', e.target.value)}
            />
        </form>
    )
}
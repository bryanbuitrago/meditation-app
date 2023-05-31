import { headers } from 'next/dist/client/components/headers'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

async function createUser(name, email, password) {

    const response = await fetch('/api/signup/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }
    return data
}

const AuthForm = () => {

    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [isLogin, setIsLogin] = useState(true);
    // const router = useRouter()

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(event) {
        event.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        // optional: Add validation
        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
            })
            // if (!result.error) {
            //     // set some auth state
            //     router.replace('/profile')
            // }
        } else {
            try {
                const result = await createUser(enteredName, enteredEmail, enteredPassword)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <section>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' id='name' required ref={nameInputRef} />
                </div>
                <div>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm
        // const [formState, setFormState] = useState({})

        // const {
        //     form,
        //     handleSubmit,
        //     setValue,
        // } = useForm()

        // const validationSchema = yup.object().shape({
        //     name: yup.string().required(),
        //     email: yup.string().email().required(),
        //     password: yup.string().min(6).required(),
        // })

        // const onSubmit = (data) => {
        //     // Validate the form data
        //     const errors = validationSchema.validate(data)

        //     if (!errors.length) {
        //         // Submit the form data to the backend
        //     } else {
        //         // Show the errors to the user
        //         setFormState({ errors })
        //     }
        // }

        // return (
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <input
        //             type='text'
        //             placeholder='Name'
        //             name='name'
        //             value={formState.name}
        //             onChange={(e) => setValue('name', e.target.value)}
        //         />
        //         <input
        //             type='email'
        //             placeholder='Email'
        //             name='email'
        //             value={formState.email}
        //             onChange={(e) => setValue('email', e.target.value)}
        //         />

        //         <input
        //             type='password'
        //             placeholder='Password'
        //             name='password'
        //             value={formState.password}
        //             onChange={(e) => setValue('password', e.target.value)}
        //         />
        //     </form>
        // )


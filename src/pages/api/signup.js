import { connectDB, disconnectDB } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/middleware/auth";
import User from "@/models/User";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return
    }

    const validateName = (name) => {
        if (!name) {
            return new Error('Name cannot be empty')
        }
        const nameRegex = /^[A-Za-z\s]+$/
        if (!nameRegex.test(name)) {
            return new Error('Invalid name')
        }
        return null
    }

    const validateEmail = (email) => {
        if (email === '') {
            return new Error('Email cannot be empty');
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(email)) {
            return new Error('Invalid email address');
        }

        return null;
    };

    const validatePassword = (password) => {
        if (password === '') {
            return new Error('Password cannot be empty');
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;
        if (!passwordRegex.test(password)) {
            return new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }

        return null;
    };

    const { name, email, password } = req.body


    const nameError = validateName(name)
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError) {
        return res.status(400).json({ error: nameError.message })
    }
    if (emailError) {
        return res.status(400).json({ error: emailError.message });

    }

    if (passwordError) {
        return res.status(400).json({ error: passwordError.message });

    }

    try {

        await connectDB()

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            await disconnectDB()
            return res.status(422).json({ message: 'User alredy exists!' })
        }
        console.log(email)
        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({ name, email, password: hashedPassword })

        await disconnectDB()

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server errror ' })
    }
};
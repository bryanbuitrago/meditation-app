import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB, disconnectDB } from "@/lib/db";
import { verifyPassword } from "@/utils/bcrypt";
import User from "@/models/User";

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                console.log('credentials= ', credentials)
                await connectDB();

                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error('Invalid credentials!');
                }

                const user = await User.findOne({ email });

                if (!user) {
                    await disconnectDB();
                    throw new Error('User not found!');
                }

                const isValid = await verifyPassword(password, user.password);

                if (!isValid) {
                    await disconnectDB();
                    throw new Error('Could not log you in!');
                }

                const { name } = user
                await disconnectDB();
                return { email, name };
            },
        }),
    ],
    pages: {
        signIn: '/sign-up',
    }
});

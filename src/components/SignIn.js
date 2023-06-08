import React, { useState } from "react";
import { useSession } from "next-auth/react";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { data: session, status } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await nextAuth.signIn({
                username,
                password,
            });

            // Redirect to the homepage after successful signin
            await nextRouter.push("/");
        } catch (error) {
            // Handle errors
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={setUsername}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
            />
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignIn;
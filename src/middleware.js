export { default } from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'


// export default withAuth({
//     pages: {
//         "/sign-up": "SignIn"
//     },
//     onUnauthenticated: (req, res) => {
//         res.status(401).send("Invalid username or password");
//     },
// });
export const config = { matcher: ['/profile'] }
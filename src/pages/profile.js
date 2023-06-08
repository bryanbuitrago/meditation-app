import { useSession } from "next-auth/react";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";




function ProfilePage() {
    return <UserProfile />
}

export async function getServerSideProps({ req, res }) {
    const session = await getServerSession(req, res)


    if (!session) {
        return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
        }
    }


    return {
        props: {
            session: JSON.parse(JSON.stringify(session)),
        },
    }
}

export default ProfilePage;


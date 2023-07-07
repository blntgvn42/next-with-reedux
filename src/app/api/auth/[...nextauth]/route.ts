import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
    id: string;
    name: string;
    password: string;
};

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            type: "credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                const user: User = { id: "42", name: "bulent", password: "guven" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
});

export { handler as GET, handler as POST }
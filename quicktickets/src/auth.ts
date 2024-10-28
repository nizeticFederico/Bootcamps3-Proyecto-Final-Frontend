import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { login , getUserByMail } from "./actions/authActions";
 
export const { handlers , signIn, signOut, auth } = NextAuth({
    session:{strategy:"jwt"},
    secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
        async authorize(credentials) {
            const {email , password} = credentials as {email:string, password:string};

            try {
                const result = await login({email,password});
                if (result.error) {
                    throw new Error(result.error)
                }
                if (result.email) {
                    const user = await getUserByMail(result.email);
                    return user || null;
                }
            } catch (error) {
                throw new Error("Invalid Credentials");
                
            }
            return null;
        }
    })]
});
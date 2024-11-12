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
                if (result.token) {
                    const user = await getUserByMail(result.user.email);
                    console.log(user);
                    console.log(result);
                    if (user) {
                        return {
                            id: user.userId,
                            email: user.email,
                            role: user.role,
                            accessToken: result.token
                        }
                
                    }
                   return null;
                
                }
            } catch (error) {
                throw new Error("Invalid Email or Password");
                
            }
            return null;
        }
    })],
    
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.role = user.role;
            token.accessToken = user.accessToken;  
          }
          return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string
            session.user.email = token.email as string;
            session.user.role = token.role as string;
            session.accessToken = token.accessToken; 
            return session;
          }
    } 
    


});
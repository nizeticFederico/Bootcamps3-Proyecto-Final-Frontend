"use server"

import { signIn, signOut } from "@/auth";

export async function login(credentials: { email: string; password: string; }){
    try {
        const result = await fetch(`endpoint`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(credentials)
        });

        const data = await result.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};

export async function logOut(){

    await signOut();
    
}

export async function getUserByMail(email:string) {
    try {
        const result = await fetch(`endpoint`)
        const data = await result.json();
            return {
                userId:data._id,
                email:data.email,
                username: data.username,
                role: data.role
            }
            
        
    } catch (error) {
        console.log(error)
        return error;
    }
};


export async function formLogin(formData: FormData){
    const email = formData.get("email") as string;
    const password=formData.get("password") as string;


    try {
        const result = await signIn("credentials", {email , password, redirect: false});
        return result;
    } catch (error) {
        console.log(error);
    }
};
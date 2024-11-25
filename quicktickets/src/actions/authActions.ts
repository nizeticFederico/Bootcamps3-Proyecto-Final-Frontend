"use server"

import { signIn, signOut } from "@/auth";

export async function login(credentials: { email: string; password: string; }){
    try {
        const result = await fetch(`https://kit-rich-starling.ngrok-free.app/auth/login`, {
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


export async function getUserByMail(email:string) {
    try {
        const result = await fetch(`https://kit-rich-starling.ngrok-free.app/user/information-by-email?email=${email}`)
        const data = await result.json();
            return {
                userId:data._id,
                email:data.email,
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
        if (result?.error) {
            return { success: false, error: result.error };
        }
        return { success: true, result };
    } catch (error) {
        return { success: false, error: "Invalid email or password." };
    }
};
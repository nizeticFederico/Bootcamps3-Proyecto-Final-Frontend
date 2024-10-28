"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import Message from "@/components/UI/Message";
import Image from "next/image"

export default function SignIn(){

    const [values, setValues] = useState({name:"", email:"", password:""});
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [status , setStatus] = useState<number | null >(null)

    const router = useRouter();

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setLoading(true);

        const data = {
            name: values.name,
            email: values.email,
            password: values.password
        }



        try {
            const response = await fetch(`endpoint`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data)
            })

            if (response.status === 200) {
                setLoading(false)
                setStatus(response.status)
                setTimeout(()=>{
                    setStatus(null)
                }, 3000)
                router.push("/")
                
            }else{
                setStatus(response.status);
                setLoading(false)
                setTimeout(()=>{
                    setStatus(null)
                }, 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const {currentTarget} = event;
        const {name , value} = currentTarget;
       
        setValues({ ...values, [name]:value});
    }


    return(
        <main className="flex items-center h-screen">
           <div className="flex flex-col justify-start w-2/3 h-screen gap-4 p-4">
                <Image src="/assets/images/icon.svg" width={128} height={38} alt="Aplication Logo" className="ml-4"></Image>
                <Image src="/assets/images/quickticketswhite.svg" width={128} height={38} alt="Aplication Logo" className="ml-4"></Image>
                <h2 className="font-bold text-4xl text-white p-8 leading-[1.5]">Discover Tailored <br /> events.<br /> Sign up for personalized <br />  recommendations <br />  today!</h2>
           </div> 
           <div className="flex flex-col justify-center w-full h-screen bg-white rounded-tl-[50px] rounded-bl-[50px] pl-16 pr-16 ">
           <h1 className="font-bold  text-3xl mt-4 pl-32">Create Account</h1>
            <form className="flex flex-col gap-2 p-32 pb-4 pt-4" onSubmit={handleSubmit}>
                
                <label htmlFor="name">Full Name</label>
                <input  type="text" 
                        name="name" 
                        placeholder="Enter your full-name" 
                        value={values.name}  
                        onChange = {handleChange} 
                        className="border rounded-md p-3 focus:outline-none border-gray-300 focus:border-gray-500"
                        required/>
                        
                <label htmlFor="email">E-mail Adress</label>
                <input  type="email" 
                        name="email" 
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
                        placeholder="Enter your e-mail" value={values.email}  
                        onChange = {handleChange} 
                        className="border rounded-md p-3 focus:outline-none border-gray-300 focus:border-gray-500 peer"
                        />
                <span className="hidden peer-invalid:flex text-xs text-red-500">*Invalid e-mail</span>

                <label htmlFor="password">Password</label>
                <div className="relative">
                <input  type={ showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Enter your password" 
                        value={values.password} 
                        onChange = {handleChange} 
                        className="border w-full rounded-md p-3 focus:outline-none border-gray-300 focus:border-gray-500"
                        required/>

                <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            { showPassword ? 
                            (<Image src="assets/eye-solid.svg" height={20} width={20} alt="show password" ></Image>) :
                            (<Image src="assets/eye-slash-solid.svg" height={20} width={20} alt="hidde password" ></Image>)}</button>
                </div>
                <button type="submit" 
                        className=" flex items-center justify-center text-lg rounded-md p-3 mt-4 min-h-[50px] text-white text-bold bg-[#2B293D] hover:bg-[#3F3D51] w-full relative">
                    {loading ? (
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="loader"></div>
                    </div>
                           ) : (
                        'Create Account'
                )}
                </button>
                
                <p className="text-sm my-4">Already have an account? 
                    <a href="/" className="text-gray-500"> Login</a>
                </p>
                <Message status={status}/>
            </form>
            
           </div>
        </main>
    )
}
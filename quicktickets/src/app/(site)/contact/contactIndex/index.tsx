import Image from "next/image"
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'], 
    weight: ['400', '500', '600', '700'], 
  });

export default function ContactPage(){




    return(
        <div className={`${poppins.className} flex flex-col items-center justify-center p-6 gap-2 border`}>
            <h1 className="font-bold text-4xl">Contac with us!</h1>
            <h3 className="text-3xl">Send us a email or a message!</h3>
    <ul className="flex flex-col  gap-2 p-4 text-xl">
  <li>Email: <a className="text-gray-500" href="mailto:quicktickets@gmail.com">quicktickets@gmail.com</a></li>
  <li>Watsapp: +03794 234 567 890</li>
  </ul>
  <div>
  <ul className="flex items-center justify-center gap-2 text-xl font-bold p-4 pb-16">
      <li className="flex flex-col items-center text-xl transition-transform transform hover:scale-110 hover:shadow-lg duration-300 hover:rounded-lg"><a href="https://twitter.com/tuusuario"><Image src="/assets/images/icons/twitter-x.svg" alt = "X Logo" width={270} height={270}></Image></a><p >X</p></li>
      <li className="flex flex-col items-center text-xl transition-transform transform hover:scale-110 hover:shadow-lg duration-300 hover:rounded-lg"><a href="https://facebook.com/tuusuario"><Image src="/assets/images/icons/facebook-logo-svg.svg" alt = "Facebook Logo" width={300} height={300}></Image></a><p>Facebook</p></li>
      <li className="flex flex-col items-center text-xl transition-transform transform hover:scale-110 hover:shadow-lg duration-300 hover:rounded-lg"><a href="https://instagram.com/tuusuario"><Image src="/assets/images/icons/Instagram-Logo.wine.svg" alt = "instagram Logo" width={300} height={300}></Image></a><p>Instagram</p></li>
    </ul>
  </div>
    
  

        </div>
    )
}
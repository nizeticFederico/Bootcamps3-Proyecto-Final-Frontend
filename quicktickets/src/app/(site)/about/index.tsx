import Image from "next/image"

export default async function AboutUs(){
    return(
        <main className="flex flex-col items-center min-h-screen">
            <div className="w-full h-52 bg-[url('../../public/assets/images/about.jpg')] bg-cover bg-center flex items-center justify-center">
                <h2 className="font-bold text-4xl text-white text-center">About Us</h2>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-2xl text-[#2B293D] px-20 py-10 leading-[1.5] mb-0">Our History</h3>
                <p className=" text-[#2B293D] px-20 leading-[1.5]">It all started in 2024, when, due to fate, we managed to be selected for Bootcamp 3.0 organized by the company Devlights. In that space, we had the opportunity to explore new tools and delve into languages that we had already studied. The objective of the Bootcamp was to develop a website where we could upload everything we learned and, if possible, a little more. <br /> <br /> This is how QuickTickets, our event platform, was born. At first, we considered various alternatives, and that was when a colleague found the option that best suited our needs. With enthusiasm, we divide the tasks and organize the activities, building the page little by little. Collaboration and dialogue were essential; We used Trello boards to manage our projects, created Discord groups to share ideas, and maintained constant communication through WhatsApp.<br /> <br /> This is how QuickTickets, our event platform, was born. At first, we considered various alternatives, and that was when a colleague found the option that best suited our needs. With enthusiasm, we divide the tasks and organize the activities, building the page little by little. Collaboration and dialogue were essential; We used Trello boards to manage our projects, created Discord groups to share ideas, and maintained constant communication through WhatsApp.<br /> <br /> Over time, we not only focused on technical development, but also learned to value the relationships built during the process. Every meeting, every conversation, and every idea shared brought us closer to our common goal, and in the end, QuickTickets became a representation of the collective effort and passion we all put into this project.</p>
                <h3 className="font-bold text-2xl text-[#2B293D] text-start px-20 py-10 leading-[1.5]">Founders</h3>
            </div>
            <div className="flex flex-wrap justify-center w-full mb-12 space-x-4 ">
                <div className="w-56 h-60 bg-white px-8 pb-8 pt-0 rounded-lg cursor-pointer transition duration-500 group hover:shadow-lg hover:shadow-gray-500">
                        <div className="h-2 bg-[#2D2A3E] group-hover:bg-[#FFE047] rounded-b-lg mb-8 inset-x-0 top-0"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden relative">
                            {/* El contenedor div con relative es necesario cuando se utiliza fill en el componente Image. */}
                                <Image
                                    src="/assets/images/icons/user-default.svg"
                                    alt="Imagen de Perfil"
                                    fill
                                    //fill permite que la imagen ocupe todo el espacio del contenedor con object-cover, lo que garantiza que la imagen mantenga su forma circular y se centre correctamente
                                    className="object-cover"
                                />
                            </div>
                            <strong className="text-lg text-gray-800 mt-2">Fede Nizetic</strong>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-[#2D2A3E]">
                        <a href="" target="_blank">
                                <Image
                                    src="/assets/images/icons/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/sobre.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Mail"
                                />
                            </a>
                        </div>
                </div>
                <div className="w-56 h-60 bg-white px-8 pb-8 pt-0 rounded-lg cursor-pointer transition duration-500 group hover:shadow-lg hover:shadow-gray-500">
                        <div className="h-2 bg-[#2D2A3E] group-hover:bg-[#FFE047] rounded-b-lg mb-8 inset-x-0 top-0"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden relative">
                            {/* El contenedor div con relative es necesario cuando se utiliza fill en el componente Image. */}
                                <Image
                                    src="/assets/images/icons/user-default.svg"
                                    alt="Imagen de Perfil"
                                    fill
                                    //fill permite que la imagen ocupe todo el espacio del contenedor con object-cover, lo que garantiza que la imagen mantenga su forma circular y se centre correctamente
                                    className="object-cover"
                                />
                            </div>
                        <strong className="text-lg text-gray-800 mt-2">Augusto Catterino</strong>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-[#2D2A3E]">
                        <a href="" target="_blank">
                                <Image
                                    src="/assets/images/icons/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/sobre.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Mail"
                                />
                            </a>
                        </div>
                </div>

                <div className="w-56 h-60 bg-white px-8 pb-8 pt-0 rounded-lg cursor-pointer transition duration-500 group hover:shadow-lg hover:shadow-gray-500">
                        <div className="h-2 bg-[#2D2A3E] group-hover:bg-[#FFE047] rounded-b-lg mb-8 inset-x-0 top-0"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden relative">
                            {/* El contenedor div con relative es necesario cuando se utiliza fill en el componente Image. */}
                                <Image
                                    src="/assets/images/icons/user-default.svg"
                                    alt="Imagen de Perfil"
                                    fill
                                    //fill permite que la imagen ocupe todo el espacio del contenedor con object-cover, lo que garantiza que la imagen mantenga su forma circular y se centre correctamente
                                    className="object-cover"
                                />
                            </div>
                        <strong className="text-lg text-gray-800 mt-2">Pablo Merino</strong>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-[#2D2A3E]">
                        <a href="" target="_blank">
                                <Image
                                    src="/assets/images/icons/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/sobre.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Mail"
                                />
                            </a>
                        </div>
                </div>
                <div className="w-56 h-60 bg-white px-8 pb-8 pt-0 rounded-lg cursor-pointer transition duration-500 group hover:shadow-lg hover:shadow-gray-500">
                        <div className="h-2 bg-[#2D2A3E] group-hover:bg-[#FFE047] rounded-b-lg mb-8 inset-x-0 top-0"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden relative">
                            {/* El contenedor div con relative es necesario cuando se utiliza fill en el componente Image. */}
                                <Image
                                    src="/assets/images/icons/user-default.svg"
                                    alt="Imagen de Perfil"
                                    fill
                                    //fill permite que la imagen ocupe todo el espacio del contenedor con object-cover, lo que garantiza que la imagen mantenga su forma circular y se centre correctamente
                                    className="object-cover"
                                />
                            </div>
                        <strong className="text-lg text-gray-800 mt-2">Rodolfo Villalba</strong>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-[#2D2A3E]">
                        <a href="" target="_blank">
                                <Image
                                    src="/assets/images/icons/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/icons/sobre.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Mail"
                                />
                            </a>
                        </div>
                </div>

                <div className="w-56 h-60 bg-white px-8 pb-8 pt-0 rounded-lg cursor-pointer transition duration-500 group hover:shadow-lg hover:shadow-gray-500">
                        <div className="h-2 bg-[#2D2A3E] group-hover:bg-[#FFE047] rounded-b-lg mb-8 inset-x-0 top-0"></div>
                        <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden relative">
                            {/* El contenedor div con relative es necesario cuando se utiliza fill en el componente Image. */}
                                <Image
                                    src="/assets/images/RubenLedesmaPerfil.jpeg"
                                    alt="Imagen de Perfil"
                                    fill
                                    //fill permite que la imagen ocupe todo el espacio del contenedor con object-cover, lo que garantiza que la imagen mantenga su forma circular y se centre correctamente
                                    className="object-cover"
                                />
                            </div>
                        <strong className="text-lg text-gray-800 mt-2">Ruben Ledesma</strong>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4 text-[#2D2A3E]">
                            <a href="https://www.linkedin.com/in/rubendledesma/" target="_blank" className="fill-current-yellow">
                                <Image
                                    src="/assets/images/icons/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="https://github.com/ElRubenD" target="_blank" >
                                <Image
                                    src="/assets/images/icons/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="mailto:ruben.d.ledesma@gmail.com" target="_blank" >
                                <Image
                                    src="/assets/images/icons/sobre.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Mail"
                                />
                            </a>
                        </div>
                </div>
            </div>
        </main>
    )
}
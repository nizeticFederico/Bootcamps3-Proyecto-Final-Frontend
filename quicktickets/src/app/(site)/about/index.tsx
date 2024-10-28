import Image from "next/image"

export default async function AboutUs(){
    return(
        <main className="flex flex-col items-center min-h-screen">
            <div className="w-full h-52 bg-[url('../../public/assets/images/about.jpg')] bg-cover bg-center flex items-center justify-center">
                <h2 className="font-bold text-4xl text-white text-center">About Us</h2>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-2xl text-[#2B293D] px-20 py-10 leading-[1.5] mb-0">Nuestra Historia</h3>
                <p className=" text-[#2B293D] px-20 leading-[1.5]">Todo comenzó en 2024, cuando, por causa del destino, logramos ser seleccionados para el Bootcamp 3.0 organizado por la empresa Devlights. En ese espacio, tuvimos la oportunidad de explorar nuevas herramientas y profundizar en lenguajes que ya habíamos estudiado. El objetivo del Bootcamp era desarrollar una página web donde pudiéramos volcar todo lo aprendido y, si era posible, un poco más. <br /> <br />Así nació QuickTickets, nuestra plataforma para eventos. Al principio, barajamos diversas alternativas, y fue entonces cuando un compañero encontró la opción que mejor se adaptaba a nuestras necesidades. Con entusiasmo, nos repartimos las tareas y organizamos las actividades, construyendo la página poco a poco. La colaboración y el diálogo fueron fundamentales; utilizamos tableros de Trello para gestionar nuestros proyectos, creamos grupos en Discord para compartir ideas y manteníamos una comunicación constante a través de WhatsApp. <br /> <br />La experiencia del Bootcamp fue más que un simple aprendizaje técnico; nos enseñó sobre el poder del trabajo en equipo y la importancia de la empatía. A medida que QuickTickets tomaba forma, nos dimos cuenta de que estábamos creando algo significativo, una herramienta que podría transformar la forma en que las personas se conectan con eventos en nuestra comunidad. <br /> <br />Con el tiempo, no solo nos enfocamos en el desarrollo técnico, sino que también aprendimos a valorar las relaciones construidas durante el proceso. Cada reunión, cada conversación, y cada idea compartida nos acercaron más a nuestro objetivo común, y al final, QuickTickets se convirtió en una representación del esfuerzo colectivo y la pasión que todos pusimos en este proyecto.</p>
                <h3 className="font-bold text-2xl text-[#2B293D] text-start px-20 py-10 leading-[1.5]">Fundadores</h3>
            </div>
            <div className="flex flex-wrap justify-center w-full mb-4 space-x-4 ">
                <div className="w-56 h-60 bg-white px-8 pb-8 pt-0 rounded-lg cursor-pointer transition duration-500 group hover:shadow-lg hover:shadow-gray-500">
                        <div className="h-2 bg-[#2D2A3E] group-hover:bg-[#FFE047] rounded-b-lg mb-8 inset-x-0 top-0"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden relative">
                            {/* El contenedor div con relative es necesario cuando se utiliza fill en el componente Image. */}
                                <Image
                                    src="/assets/images/user-default.svg"
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
                                    src="/assets/images/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/sobre.svg"
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
                                    src="/assets/images/user-default.svg"
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
                                    src="/assets/images/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/sobre.svg"
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
                                    src="/assets/images/user-default.svg"
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
                                    src="/assets/images/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/sobre.svg"
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
                                    src="/assets/images/user-default.svg"
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
                                    src="/assets/images/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="" target="_blank" >
                                <Image
                                    src="/assets/images/sobre.svg"
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
                                    src="/assets/images/linkedin.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo Linkedin"
                                />
                            </a>
                            <a href="https://github.com/ElRubenD" target="_blank" >
                                <Image
                                    src="/assets/images/github.svg"
                                    width={30}
                                    height={30}
                                    alt="Logo GitHub"
                                />
                            </a>
                            <a href="mailto:ruben.d.ledesma@gmail.com" target="_blank" >
                                <Image
                                    src="/assets/images/sobre.svg"
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
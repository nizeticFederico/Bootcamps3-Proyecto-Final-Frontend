import SearchBar from "@/components/UI/SearchBar"

export default async function EventsPage(){
    return(
        <main className="flex flex-col items-center min-h-screen">
            <div className="flex flex-col w-full h-52 bg-[#4f4d6a] bg-cover bg-center flex items-center justify-center">
                <h2 className="font-bold text-4xl text-white text-center">Explore a world of events. Find what excites you!</h2>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}
import SearchBar from "@/components/UI/SearchBar"
import FilterColumn from "@/components/UI/FilterColumn"
import EventCard from "@/components/UI/CardEvent"

export default async function EventsPage(){
    return(
        <main className="flex flex-col items-center min-h-screen bg-white">
            <div className="flex flex-col w-full h-52 bg-[#4f4d6a] bg-cover bg-center items-center justify-center">
                <h2 className="font-bold text-4xl text-white text-center mb-5">Explore a world of events. Find what excites you!</h2>
                <div className="w-full">
                    <SearchBar />
                </div>
            </div>
            <div className="flex flex-row w-full max-w-screen-xl">
                <div className="flex-none ml-0">
                    <FilterColumn />
                </div>
                <div className="flex-grow ml-4 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {/* Cards de Eventos */}
                        <EventCard
                            name="Encuentro provincial de estadistica"
                            description=""
                            imageUrl="/assets/images/about.jpg"
                            dateTime="2024-12-10T23:30"
                            price={0}
                            capacity={2560}
                            location="Corrientes"
                            category="Conferencia"
                            latitude={-27.469}
                            longitude={-58.833}
                            creatorId="user123"
                        />
                        <EventCard
                            name="Taragüi Rock"
                            description=""
                            imageUrl="/assets/images/about.jpg"
                            dateTime="2024-11-09T10:30"
                            price={6000}
                            capacity={10000}
                            location="Corrientes"
                            category="Musica"
                            latitude={-27.469}
                            longitude={-58.833}
                            creatorId="user123"
                        />
                        <EventCard
                            name="Taragüi Rock"
                            description=""
                            imageUrl="/assets/images/about.jpg"
                            dateTime="2024-11-09T10:30"
                            price={6000}
                            capacity={0}
                            location="Corrientes"
                            category="Musica"
                            latitude={-27.469}
                            longitude={-58.833}
                            creatorId="user123"
                        />
                        <EventCard
                            name="Taragüi Rock"
                            description=""
                            imageUrl="/assets/images/about.jpg"
                            dateTime="2024-11-09T10:30"
                            price={6000}
                            capacity={0}
                            location="Corrientes"
                            category="Musica"
                            latitude={-27.469}
                            longitude={-58.833}
                            creatorId="user123"
                        />
                        <EventCard
                            name="Taragüi Rock"
                            description=""
                            imageUrl="/assets/images/about.jpg"
                            dateTime="2024-11-09T10:30"
                            price={6000}
                            capacity={10000}
                            location="Corrientes"
                            category="Musica"
                            latitude={-27.469}
                            longitude={-58.833}
                            creatorId="user123"
                        />
                        <EventCard
                            name="Taragüi Rock"
                            description=""
                            imageUrl="/assets/images/about.jpg"
                            dateTime="2024-11-09T10:30"
                            price={6000}
                            capacity={10000}
                            location="Corrientes"
                            category="Musica"
                            latitude={-27.469}
                            longitude={-58.833}
                            creatorId="user123"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
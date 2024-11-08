
import SearchBar from "@/components/UI/SearchBar"
import CategoriesBanner from "@/components/UI/CategoriesBanner"
import NewsletterBanner from "@/components/UI/NewsLetterBanner"
import CreateEventBanner from "@/components/UI/CreateEventBanner"
import HomeSection from "@/components/UI/HomeFirstSection"

export default async function HomePage(){
    return(
        <main className="flex flex-col items-center min-h-screen bg-white">
            <div className="flex flex-col w-full h-80 bg-[url('../../public/assets/images/home2.jpg')] bg-cover bg-center items-center justify-center">
                <h2 className="font-bold text-4xl text-white text-left p-4 mb-5">Don&apos;t miss out! <br />Explore the <span className="text-[#FFE047]">vibrant events</span> happening locally and globally.</h2>
                <div className="w-full text-base">
                    <SearchBar />
                </div>
            </div>
            <div>
                <CategoriesBanner />
                <HomeSection />
                <NewsletterBanner />
                <CreateEventBanner />
            </div>
        </main>
    )
}
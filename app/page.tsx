import FeaturedCollection from "@/components/FeaturedCollection"
import Hero from "@/components/Hero"
import LatestProducts from "@/components/LatestProducts"
import Collection from "@/components/Collection"
import AboutUs from "@/components/AboutUs"

export default function Home() {
  return (
    <div className='w-full'>
      <Hero />
      <FeaturedCollection />
      <LatestProducts />
      <Collection />
      <AboutUs />
    </div>
  )
}

import "./styles.css"
import HeroSection from "../../sections/heroSection"
import CategoriesSection from "../../sections/categoriesSection"
import DiscountSection from "../../sections/discountSection"
import SalesSection from "../../sections/salesSection"

function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <DiscountSection />
      <SalesSection />
    </>
  )
}

export default Home

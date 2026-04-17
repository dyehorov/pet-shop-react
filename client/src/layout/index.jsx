import { NavLink, Outlet } from "react-router"
import Header from "../components/header"
import Footer from "../components/footer"

function Layout() {
  return (
    <div className="layout">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout

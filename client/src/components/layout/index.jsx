import { NavLink, Outlet } from "react-router"
import Header from "../header"
import Footer from "../footer"

function Layout() {
  return (
    <div className="layout">
      <Header />

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout

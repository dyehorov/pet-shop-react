import { NavLink } from "react-router"
import styles from "./styles.module.css"

const navMenu = [
  { title: "Main Page", path: "/" },
  { title: "Categories", path: "/categories/all" },
  { title: "All products", path: "/products/all" },
  { title: "All sales", path: "/products/allSales" },
]

export default function Nav() {
  return (
    <nav>
      <ul className={styles.navList}>
        {navMenu.map(menuItem => {
          return (
            <li key={menuItem.title}>
              <NavLink
                to={menuItem.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.activeLink : ""}`
                }
              >
                {menuItem.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

import { Link } from "react-router"

import styles from "./styles.module.css"

function BreadCrumbs({ previous, current }) {
  return (
    <div className={styles.breadcrumbs}>
      {previous.map((elem, index) => (
        <Link key={index} to={elem.path} className={styles.link}>
          {elem.title}
        </Link>
      ))}
      <div className={styles.current_page}>{current}</div>
    </div>
  )
}

export default BreadCrumbs

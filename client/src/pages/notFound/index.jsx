import styles from "./styles.module.css"
import { Link } from "react-router"
import notFoundImage from "../../assets/404.jpg"
import Container from "../../components/container"

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <Container>
        <div>
          <img src={notFoundImage} alt="Not found image" />
        </div>
        <h2 className={styles.notFoundTitle}>Page not found</h2>
        <p className={styles.notFoundMessage}>
          We’re sorry, the page you requested could not be found. <br /> Please
          go back to the homepage.
        </p>
        <Link to="/" className={styles.notFoundLink}>
          Go Home
        </Link>
      </Container>
    </div>
  )
}

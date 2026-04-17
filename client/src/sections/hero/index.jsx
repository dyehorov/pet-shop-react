import styles from "./styles.module.css"
import Container from "../../components/container"
import { Link } from "react-router"

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Amazing Discounts <br /> on Pets Products!
          </h1>
          <Link className={styles.heroLink} to="/sales">
            Check out
          </Link>
        </div>
      </Container>
    </div>
  )
}

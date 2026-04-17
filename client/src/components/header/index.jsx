import styles from "./styles.module.css"
import logo from "../../assets/icons/pet-shop_logo.svg"
import cartIcon from "../../assets/icons/cart-icon.svg"
import Container from "../container"
import Nav from "../nav"
import { Badge } from "antd"

export default function Header() {
  return (
    <header>
      <Container>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <img src={logo} alt="Pet shop logo" />
          </div>
          <Nav />
          <div className={styles.cartIcon}>
            <Badge
              count="5"
              style={{ backgroundColor: "#0D50FF" }}
              offset={[-40, 15]}
              size="medium"
            >
              <img src={cartIcon} alt="Cart Icon" />
            </Badge>
          </div>
        </div>
      </Container>
    </header>
  )
}

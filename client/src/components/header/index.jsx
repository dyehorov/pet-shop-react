import styles from "./styles.module.css"
import logo from "../../assets/icons/pet-shop_logo.svg"
import cartIcon from "../../assets/icons/cart-icon.svg"
import Container from "../container"
import Nav from "../nav"
import { Badge } from "antd"
import { Link } from "react-router"
import DropDownMenu from "../dropDownMenu"

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Link className={styles.logo} to="/">
            <img src={logo} alt="Pet shop logo" />
          </Link>
          <Nav />
          <DropDownMenu />
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

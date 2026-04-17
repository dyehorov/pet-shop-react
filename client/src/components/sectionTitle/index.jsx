import { Flex, Button } from "antd"
import styles from "./styles.module.css"
import { Link } from "react-router"

export default function SectionTitle({ title }) {
  return (
    <Flex align="center" className={styles.sectionTitleWrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}></div>
      <Link className={styles.button} to="/categories/all">
        All {title}
      </Link>
    </Flex>
  )
}

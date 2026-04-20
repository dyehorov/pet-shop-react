import { DownOutlined } from "@ant-design/icons"
import { Dropdown } from "antd"
import { Link } from "react-router"
import styles from "./styles.module.css"

const items = [
  {
    key: "0",
    label: <Link to="/">Main Page</Link>,
  },
  {
    key: "1",
    label: <Link to="/categories/all">Categories</Link>,
  },
  {
    key: "2",
    label: <Link to="/products/all">All products</Link>,
  },
  {
    key: "3",
    label: <Link to="/products/allSales">All sales</Link>,
  },
]

export default function DropDownMenu() {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <button type="button" className={styles.menuButton}>
        Menu <DownOutlined />
      </button>
    </Dropdown>
  )
}

import styles from "./styles.module.css"
import { Select } from "antd"
import checkMark from "../../assets/icons/checkbox.svg"

const sortOptions = [
  { value: "default", label: "by default" },
  { value: "price-desc", label: "price: high-low" },
  { value: "price-asc", label: "price: low-high" },
]

export default function ProductsFilter({
  filters,
  setFilters,
  showDiscountFilter = true,
}) {
  const handleInputChange = event => {
    const { name, value } = event.target

    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = () => {
    setFilters(prev => ({
      ...prev,
      onlyDiscounted: !prev.onlyDiscounted,
    }))
  }

  const handleSortChange = event => {
    setFilters(prev => ({
      ...prev,
      sortType: event,
    }))
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <span className={styles.label}>Price</span>

        <input
          type="number"
          name="priceFrom"
          placeholder="from"
          value={filters.priceFrom}
          onChange={handleInputChange}
          className={styles.input}
        />

        <input
          type="number"
          name="priceTo"
          placeholder="to"
          value={filters.priceTo}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>

      {showDiscountFilter && (
        <div className={styles.filterGroup}>
          <span className={styles.label}>Discounted items</span>

          <button
            type="button"
            className={`${styles.checkbox} ${
              filters.onlyDiscounted ? styles.checkboxActive : ""
            }`}
            onClick={handleCheckboxChange}
            aria-pressed={filters.onlyDiscounted}
          >
            {filters.onlyDiscounted && (
              <span className={styles.checkmark}>
                <img src={checkMark} alt="Check mark" />
              </span>
            )}
          </button>
        </div>
      )}

      <div className={styles.filterGroup}>
        <span className={styles.label}>Sorted</span>

        <Select
          value={filters.sortType}
          onChange={handleSortChange}
          options={sortOptions}
          className={styles.select}
          classNames={{ popup: { root: styles.selectPopup } }}
        />
      </div>
    </div>
  )
}

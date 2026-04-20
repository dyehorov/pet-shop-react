export function filterProducts(products, filters) {
  let result = [...products]

  result = result.filter(product => {
    const actualPrice = product.discont_price || product.price

    if (filters.priceFrom && actualPrice < Number(filters.priceFrom)) {
      return false
    }

    if (filters.priceTo && actualPrice > Number(filters.priceTo)) {
      return false
    }

    if (filters.onlyDiscounted && product.discont_price == null) {
      return false
    }

    return true
  })

  switch (filters.sortType) {
    case "price-desc":
      result.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price),
      )
      break

    case "price-asc":
      result.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price),
      )
      break

    default:
      break
  }

  return result
}

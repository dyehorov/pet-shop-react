import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Container from "../../components/container"
import { fetchProduct } from "../../redux/slices/productSlice"
import { addToCart } from "../../redux/slices/cartSlice"
import styles from "./styles.module.css"
import BreadCrumbs from "../../components/breadCrumbs"

export default function Product() {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const { data: product, status, error } = useSelector(state => state.product)
  const { data: categories } = useSelector(state => state.categories)
  const cartItems = useSelector(state => state.cart.items)

  const isInCart = cartItems.some(item => item.id === Number(productId))

  const [count, setCount] = useState(1)

  const categorie = categories.find(
    categorie => categorie?.id === product?.categoryId,
  )

  useEffect(() => {
    if (!productId) return
    dispatch(fetchProduct(productId))
  }, [dispatch, productId])

  if (status === "loading")
    return (
      <Container>
        <div className={styles.productInner}>
          <h2 className={styles.feedback}>Loading...</h2>
        </div>
      </Container>
    )

  if (status === "failed")
    return (
      <Container>
        <div className={styles.productInner}>
          <h2 className={styles.feedback}>
            {error?.message || "Failed to load product"}
          </h2>
        </div>
      </Container>
    )

  if (!product)
    return (
      <Container>
        <BreadCrumbs
          previous={[
            { title: "Main page", path: "/" },
            { title: "Categories", path: "/categories/all" },
          ]}
          current="Not found"
        />
        <div className={styles.productInner}>
          <h2 className={styles.feedback}>Product not found</h2>
        </div>
      </Container>
    )

  const currentPrice = product.discont_price || product.price
  const discountPercent = product.discont_price
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100,
      )
    : null

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: count,
      }),
    )
  }

  return (
    <Container>
      <BreadCrumbs
        previous={[
          { title: "Main page", path: "/" },
          { title: "Categories", path: "/categories/all" },
          {
            title: categorie?.title,
            path: "/categories/" + "category.category.id",
            path: `/categories/${categorie?.id}`,
          },
        ]}
        current={product.title}
      />
      <div className={styles.productInner}>
        <div className={styles.productImage}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            className={styles.image}
          />
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <div className={styles.priceRow}>
            <p className={styles.productPrice}>${currentPrice}</p>
            {product.discont_price && (
              <>
                <p className={styles.oldPrice}>${product.price}</p>
                <span className={styles.discountBadge}>
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>
          <div className={styles.actionsRow}>
            <div className={styles.counter}>
              <button
                type="button"
                className={styles.counterButton}
                onClick={() => setCount(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className={styles.counterValue}>{count}</span>
              <button
                type="button"
                className={styles.counterButton}
                onClick={() => setCount(prev => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "In cart" : "Add to cart"}
            </button>
          </div>
          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionTitle}>Description</p>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

import styles from "./styles.module.css"

export default function Form({
  register,
  errors = {},
  onSubmit,
  submitLabel,
  successLabel,
  loadingLabel,
  status = "idle",
  disabled = false,
  theme = "light",
  className = "",
  error = null,
}) {
  const formClassName = className ? `${styles.form} ${className}` : styles.form
  const isDark = theme === "dark"
  const inputClassName = `${styles.input} ${isDark ? styles.inputDark : ""}`
  const buttonClassName = `${styles.button} ${isDark ? styles.buttonDark : ""}`

  const isLoading = status === "loading"
  const isSucceeded = status === "succeeded"

  const buttonLabel = isLoading
    ? loadingLabel || submitLabel
    : isSucceeded
      ? successLabel || submitLabel
      : submitLabel

  return (
    <form className={formClassName} onSubmit={onSubmit}>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          className={inputClassName}
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="tel"
          placeholder="Phone number"
          className={inputClassName}
          inputMode="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9+\-()\s]+$/,
              message: "Use only digits and phone symbols",
            },
            onChange: event => {
              event.target.value = event.target.value.replace(
                /[^0-9+\-()\s]/g,
                "",
              )
            },
          })}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          className={inputClassName}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className={
          isSucceeded
            ? `${buttonClassName} ${styles.buttonSuccess}`
            : buttonClassName
        }
        disabled={disabled || isLoading || isSucceeded}
      >
        {buttonLabel}
      </button>

      {error && <p className={styles.submitError}>{error}</p>}
    </form>
  )
}

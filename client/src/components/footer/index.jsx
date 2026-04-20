import InstagramIcon from "../../assets/icons/ic-instagram.svg"
import WhatsAppIcon from "../../assets/icons/ic-whatsapp.svg"
import { Row, Col } from "antd"
import Container from "../container"
import styles from "./styles.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          <h2 className={styles.title}>Contact</h2>

          <Row gutter={[32, 32]} className={styles.contactGrid}>
            <Col xs={24} lg={14}>
              <div className={styles.card}>
                <p className={styles.label}>Phone</p>
                <a href="tel:+493091588492" className={styles.value}>
                  +49 30 915-88492
                </a>
              </div>
            </Col>
            <Col xs={24} lg={10}>
              <div className={styles.card}>
                <p className={styles.label}>Socials</p>
                <div className={styles.socials}>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className={styles.socialLink}
                  >
                    <img src={InstagramIcon} alt="Instagram icon" />
                  </a>
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className={styles.socialLink}
                  >
                    <img src={WhatsAppIcon} alt="WhatsApp icon" />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={14}>
              <div className={styles.card}>
                <p className={styles.label}>Address</p>
                <address className={styles.value}>
                  Wallstraße 9-13, 10179 Berlin,
                  <br />
                  Deutschland
                </address>
              </div>
            </Col>
            <Col xs={24} lg={10}>
              <div className={styles.card}>
                <p className={styles.label}>Working Hours</p>
                <p className={styles.value}>24 hours a day</p>
              </div>
            </Col>
          </Row>
          <div className={styles.mapWrapper}>
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Wallstraße%209-13,%2010179%20Berlin&output=embed"
              className={styles.map}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}

import styles from "./styles.module.css"
import SectionListItem from "../sectionListItem"
import { Carousel } from "antd"

export default function SectionList({ sectionList }) {
  return (
    <div className={styles.sectionList}>
      <Carousel
        arrows
        dots={false}
        infinite={true}
        speed={500}
        slidesToShow={4}
        slidesToScroll={2}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {sectionList.map(item => (
          <div key={item.id} className={styles.slide}>
            <SectionListItem {...item} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

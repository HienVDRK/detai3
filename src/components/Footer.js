import styles from '../styles/footer.module.css'

function Footer () {
  return (
    <div className={styles.footerContainer}>
      <h4 className={styles.footerInfomation}>
        Tìm kiếm phim trên trang IMDB <br />
        Copyright: "(c) 2020 Rikkeisoft"
      </h4>
    </div>
  )
}
export default Footer

import styles from '../styles/footer.module.css'

function Footer () {
  return (
    <div className={styles.div}>
      <h4 className={styles.footer}>
        Tìm kiếm phim trên trang IMDB <br />
        Copyright: "(c) 2020 Rikkeisoft"
      </h4>
    </div>
  )
}
export default Footer

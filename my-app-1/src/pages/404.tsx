import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>

      <div className={styles.error}>
        <div className={styles.error__box}>
          <img src="/not_found.png" alt="404" className={styles.error__image} />
          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>Maaf, halaman yang Anda cari tidak ada.</p>

          <Link href="/" className={styles.error__button}>
            Kembali ke Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Custom404;
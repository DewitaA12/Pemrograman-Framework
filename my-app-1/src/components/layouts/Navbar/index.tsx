import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"; // ✅ Ganti <img> biasa dengan next/image

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__brand}>MyApp</div>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}

              {/* ✅ Tugas Mandiri No. 5 — next/image menggantikan <img> biasa */}
              {data.user?.image && (
                <Image
                  src={data.user.image}
                  alt={data.user.fullname || "User avatar"}
                  width={42}
                  height={42}
                  className={styles.navbar__user__image}
                  // priority agar gambar dimuat lebih cepat di atas fold
                  priority
                />
              )}
            </div>

            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

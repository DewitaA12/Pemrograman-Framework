import Link from "next/link";
import style from "./register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {

  // STATE & ROUTER
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  // HANDLE SUBMIT — ambil data form, kirim ke API, handle result
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();

    // Ambil data dari form
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email    = formData.get("email")    as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

    // Kirim POST request ke API register
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullname, password }),
    });

    // Handle response dari API
    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login"); // redirect ke halaman login jika sukses
    } else {
      setIsLoading(false);
      setError(
        response.status === 400 ? "Email already exists" : "An error occurred"
      );
    }
  };

  // RENDER
  return (
    <div className={style.register}>

      {/* Error message — tampil hanya jika ada error */}
      {error && <p className={style.register__error}>{error}</p>}

      {/* Judul halaman */}
      <h1 className={style.register__title}>Halaman Register</h1>

      <div className={style.register__form}>
        <form action="" onSubmit={handleSubmit}>

          {/* Input Email */}
          <div className={style.register__form__item}>
            <label
              htmlFor="email"
              className={style.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register__form__item__input}
            />
          </div>

          {/* Input Full Name */}
          <div className={style.register__form__item}>
            <label
              htmlFor="Fullname"
              className={style.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
            />
          </div>

          {/* Input Password */}
          <div className={style.register__form__item}>
            <label
              htmlFor="Password"
              className={style.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className={style.register__form__item__input}
            />
          </div>

          {/* Button Register — disabled & teks berubah saat loading */}
          <button
            type="submit"
            disabled={isLoading}
            className={style.register__form__item__button}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>

        </form>

        {/* Link ke halaman login */}
        <br />
        <p className={style.register__form__item__text}>
          Sudah punya akun?{" "}
          <Link href="/auth/login">Ke Halaman Login</Link>
        </p>

      </div>
    </div>
  );
};

export default TampilanRegister;
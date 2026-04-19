import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HalamanEditor = () => {
  const { data, status }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect jika belum login atau bukan editor/admin
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (
      status === "authenticated" &&
      data?.user?.role !== "editor" &&
      data?.user?.role !== "admin"
    ) {
      router.push("/"); // tidak punya akses
    }
  }, [status, data, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <div className="editor">
        <h1>Halaman Editor</h1>
        <p>
          Selamat datang di halaman editor, <strong>{data?.user?.fullname}</strong>!
          Di sini Anda dapat mengelola dan mempublikasikan konten aplikasi.
          Akses ini hanya tersedia untuk pengguna dengan role <em>editor</em> dan{" "}
          <em>admin</em>.
        </p>

        <section style={{ marginTop: "2rem" }}>
          <h2>Menu Editor</h2>
          <ul>
            <li>Tulis Artikel Baru</li>
            <li>Edit Konten Yang Ada</li>
            <li>Kelola Draft</li>
            <li>Publikasikan Konten</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HalamanEditor;

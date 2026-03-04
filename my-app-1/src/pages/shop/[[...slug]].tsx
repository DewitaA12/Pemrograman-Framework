import { useRouter } from "next/router";

const halamanToko = () => {
//   const Router = useRouter();
//   console.log(Router);
const { query } = useRouter();
const slug = query.slug;

  return (
    <div>
      <h1>Halaman Toko</h1>
      <p>
        Kategori: {slug ? slug[0] : "Semua Kategori"}
        </p>
      <p>
        Toko: {query.slug && query.slug[0] + "-" + query.slug[1]}
        {/* Toko: {Array.isArray(query.slug) ? query.slug.join(".") : query.slug} */}
        </p>
    </div>
  );
};

export default halamanToko;
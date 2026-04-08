import { useRouter } from "next/router";

const HalamanProduk = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.produk}</p>
    </div>
  );
};

export default HalamanProduk;
import { useRouter } from 'next/router';

const HalamanProduk = () => {
  const Router = useRouter();
  console.log(Router);    // cek isi Router di konsol browser

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk:</p>
    </div>
  );
};

export default HalamanProduk;
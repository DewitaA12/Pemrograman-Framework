import { useRouter } from 'next/router';

const HalamanBlog = () => {
  // const Router = useRouter();
  // console.log(Router);    // cek isi Router di konsol browser
  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Blog</h1>
      <p>Konten: {query.slug}</p>
    </div>
  );
};

export default HalamanBlog;
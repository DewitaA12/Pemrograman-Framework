import { useRouter } from "next/router";

const halamanToko = () => {
  const { query } = useRouter();
  const slug = query.slug;

  return (
    <div>
      <h1>Halaman Category</h1>

      {Array.isArray(slug) ? (
        <ul>
          {slug.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada parameter</p>
      )}

    </div>
  );
};

export default halamanToko;
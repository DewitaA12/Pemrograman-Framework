import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

const Kategori = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  // const { push } = useRouter();

  // Jika ingin pakai proteksi login:
  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, []);

  useEffect(() => {
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsedata) => {
        // Pastikan responsedata.data adalah array dokumen Firestore
        const formattedData: ProductType[] = responsedata.data.map(
          (doc: any) => ({
            id: doc.id,
            name: doc.name,
            price: doc.price,
            size: doc.size,
            category: doc.category
          })
        );
        setProducts(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching produk:", error);
      });
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      {products.length === 0 ? (
        <p>Belum ada produk tersedia.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>{product.name}</h2>
            <p>Harga: Rp {product.price}</p>
            <p>Ukuran: {product.size}</p>
            <p>Kategori: {product.category}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Kategori;

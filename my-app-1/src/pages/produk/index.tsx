import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const produk = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const status = localStorage.getItem("isLogin");
    if (status === "true") {
      setIsLogin(true);
    } else {
      push("/auth/login");
    }
  }, [push]);

  return (
    <div>
      <h1>Produk User Page</h1>
    </div>
  );
};

export default produk;
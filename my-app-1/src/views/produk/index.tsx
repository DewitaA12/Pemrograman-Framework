import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HeroSection from "./sections/HeroSection";
import MainSection from "./sections/MainSection";

const HalamanProduk = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push, query } = useRouter();

  useEffect(() => {
    const status = localStorage.getItem("isLogin");

    if (status === "true") {
      setIsLogin(true);
    } else {
      push("/auth/login");
    }
  }, [push]);

  if (!isLogin) return null;

  return (
    <div>
      <HeroSection />
      <MainSection id={query.id} />
    </div>
  );
};

export default HalamanProduk;
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MainHeaderBackground from "../components/MainHeaderBackground";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <>
      <MainHeaderBackground />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

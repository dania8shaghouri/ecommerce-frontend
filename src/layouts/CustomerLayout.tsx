import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";

const CustomerLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default CustomerLayout;

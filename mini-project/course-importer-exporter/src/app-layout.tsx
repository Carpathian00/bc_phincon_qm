import { Outlet } from "react-router-dom";
import Navbar from "./components/navigation-bar"; // adjust path

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
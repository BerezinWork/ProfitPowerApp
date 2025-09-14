import { Outlet } from "react-router-dom";

import Header from "./components/Header/index.jsx";
import Footer from "./components/Footer/index.jsx";

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
export default Layout;
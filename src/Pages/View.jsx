import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Home from "./Index/Home";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import PDPage from "./DetailProductPage/PDPage";
import Blog from "./Blog/Blog";
import GTPage from "./GioiThieu/GTPage";
import LHPage from "./LienHe/LHPage";
import CSBHPage from "./ChinhSachBaoHanh/CSBHPage";
import CSDTPage from "./ChinhSachDoiTra/CSDTPage";
import Login from "./Login/Login";
import CartPage from "./Cart/CartPage";
import Checkout from "./Checkout/CheckoutPage";
import LayoutPD from "./ProductPage/Layout/LayoutPD";
import BPCPage from "./ProductPage/BamphimcoPage";
import KCPage from "./ProductPage/KicapPage";
import ChuotPage from "./ProductPage/Chuot";
import ModsPage from "./ProductPage/Modsphim";
import AllPage from "./ProductPage/All";
import Register from "./Login/Register";
import AccountPage from "./Account/Account";
import NFPage from "./NotFoundPage";
export const View = () => {
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const element = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/blog', element: <Blog /> },
        { path: '/gioi-thieu', element: <GTPage /> },
        { path: '/lien-he', element: <LHPage /> },
        { path: '/chinh-sach-bao-hanh', element: <CSBHPage /> },
        { path: '/chinh-sach-doi-tra', element: <CSDTPage /> },

        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/cart', element: <CartPage /> },
        {
            path: '/account', element: (
                <PrivateRoute>
                    <AccountPage />
                </PrivateRoute>
            )
        },
        { path: '/checkout', element: <Checkout /> },
        {
            path: '/',
            element: <LayoutPD />,
            children: [
                { path: 'keycap_bo', element: <KCPage /> }, // Thêm dấu '/' ở đầu path con
                { path: 'banphimco', element: <BPCPage /> }, // Thêm dấu '/' ở đầu path con
                { path: 'chuot', element: <ChuotPage /> },    // Thêm dấu '/' ở đầu path con
                { path: 'modsphim', element: <ModsPage /> },   // Thêm dấu '/' ở đầu path con
                { path: 'sanpham/all', element: <AllPage /> }, // Thêm dấu '/' ở đầu path con
            ],
        },
        // Đặt ở cuối cùng hoặc gần cuối
        { path: '*', element: <NFPage /> },
        { path: '/product/:slug', element: <PDPage /> },

    ]);

    return (
        <>
            <div className="">
                {location.pathname !== "/checkout" && <Header />}
                <div className="container">
                    {element}
                </div >
                {location.pathname !== "/checkout" && <Footer />}
            </div>
        </>
    );
}
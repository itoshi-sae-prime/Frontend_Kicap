import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavbarMB from "../Navbar/Navbar_Mb";
import "./Header.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
const Header = () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // hoặc dùng navigate nếu dùng react-router-dom v6+
    }
    useEffect(() => {
        const getUser = async () => {
            try {
                const respone = await axios.get("/user/mes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (respone.status === 200) {
                    setUser(respone.data); // Lưu thông tin user vào state
                } else {
                    setError("Không thể lấy thông tin người dùng");
                }
            } catch (error) {
                setError(error.message); // Xử lý lỗi
            }
        }

        getUser();
    }, []);
    const { cart } = useSelector((state) => state.allCart);
    const [search, setSearch] = useState([]);
    // console.log(useSelector((state) => state.allCart));
    return (
        <div className="container">
            <div className='flex justify-between items-center py-[15px] text-[15px] px-3 w-full'>
                <div className='tracking-[2px] hidden lg:block'>
                    <span className="font-medium tracking-[0.25em]">HOTLINE TƯ VẤN:</span>
                    <span className='font-bold hover:text-gray-400 ml-[5px]'> 0369161095</span>
                </div>
                <div className="lg:hidden">
                    <NavbarMB />
                </div>
                <div className='text-[33px] font-bold tracking-[15px] pl-[25px]'>KICAP</div>
                <div className='flex justify-around items-center gap-x-3'>
                    <div className=" hidden lg:block">
                        <button className='font-medium p-[15px] tracking-[0.25em] account_button'>
                            {
                                !token ? (<Link className="hover:text-gray-400 py-[15px]" to="/login">TÀI KHOẢN</Link>) : (<Link className="hover:text-gray-400 py-[15px]" to="/account">TÀI KHOẢN</Link>)
                            }

                            <div className="absolute item bg-white top-[60px] rounded-lg shadow-lg z-10">
                                {
                                    !token ? (
                                        <div>
                                            <button className='font-medium py-[15px] w-[300px] tracking-[0.25em] block'>
                                                <Link className="hover:text-gray-400" to="/login">ĐĂNG NHẬP</Link>
                                            </button>
                                            <button className='font-medium py-[15px] w-[300px] tracking-[0.25em]'>
                                                <Link className="hover:text-gray-400" to="/register">ĐĂNG KÝ</Link>
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className='font-medium py-[15px] w-[300px] tracking-[0.25em] block'>
                                                <Link className="hover:text-gray-400" to="/account">Chào {user.name}</Link>
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className='font-medium py-[15px] w-[300px] tracking-[0.25em]'
                                            >
                                                <span className="hover:text-gray-400">ĐĂNG XUẤT</span>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </button>

                    </div>
                    <div className='flex'>
                        <button className="hidden lg:block">
                            <div className='font-medium tracking-[2px] hover:text-gray-500} tracking-[0.25em]'><Link className="hover:text-gray-400" to="/cart">GIỎ HÀNG</Link></div>
                        </button>
                        <button>
                            <div className="relative">
                                <Link className="hover:text-black" to="/cart">
                                    <i class="fa fa-shopping-cart pt-[0px] mx-[5px]" style={{
                                        fontSize: "20px",
                                    }} aria-hidden="true"></i></Link>
                                <div className="absolute bg-black top-[-18px] right-[-10px] px-[10px] py-[3px] text-white rounded-[20px] text-[12px] font-bold">{cart ? cart.length : 0}</div>
                            </div>
                        </button>
                    </div>

                    <button className="hover:text-gray-400 ml-[20px] hidden lg:block">
                        <i class="fa fa-search" style={{
                            fontSize: "20px",
                        }} aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
        </div >
    )
}
export default Header;
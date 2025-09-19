import { MdNavigateNext } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post("https://backend-kicap.onrender.com/auth/login", user);

            // ✅ Nếu login thành công
            console.log("Login thành công:", response.data);
            localStorage.setItem("token", response.data.accessToken);

            // ✅ Ví dụ redirect tới trang chủ
            window.location.href = "/account";
        } catch (error) {
            // ❌ Nếu login thất bại
            console.error("Đăng nhập thất bại:", error.response?.data || error.message);
            alert("Email hoặc mật khẩu không đúng!");
        }
    }
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
                <div className="flex justify-start items-center border-b border-gray-300 py-3 mb-6 w-full">
                    <Link to="/" className="px-2 text-sm hover:text-blue-500">
                        Trang chủ
                    </Link>
                    <div className="pt-[2px]">
                        <MdNavigateNext />
                    </div>
                    <a href="#" className="px-2 text-sm hover:text-blue-500">
                        Đăng nhập tài khoản
                    </a>
                </div>
            </div>

            <div className="max-w-md mx-auto mt-5 px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="text-2xl font-semibold uppercase tracking-wider text-center mb-6">
                        Đăng nhập tài khoản
                    </div>
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <a
                            href=""
                            className="bg-[#0657a3] text-white w-36 py-2 rounded-md flex items-center justify-center hover:bg-[#054a8a]"
                        >
                            <FaFacebookF className="mr-2 text-xl" />
                            <span className="text-sm">Facebook</span>
                        </a>
                        <a
                            href=""
                            className="bg-[#d33912] text-white w-36 py-2 rounded-md flex items-center justify-center hover:bg-[#b8310e]"
                        >
                            <FaGooglePlusG className="mr-2 text-xl" />
                            <span className="text-sm">Gmail</span>
                        </a>
                    </div>
                </div>

                <div className="mt-4 mb-4">
                    <p className="mb-2 text-lg">
                        Email <span className="text-red-500">*</span>
                    </p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        placeholder="Nhập địa chỉ Email"
                        required
                    />
                    <p className="mb-2 mt-6 text-lg">
                        Mật Khẩu <span className="text-red-500">*</span>
                    </p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        required
                    />
                    <div className="mt-8 grid place-items-center">
                        <button type="submit" onClick={handleLogin} className="bg-black text-white px-16 py-3 rounded-md tracking-wider text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            ĐĂNG NHẬP
                        </button>
                        <div className="py-3 text-gray-400 text-sm hover:text-black">
                            <Link to="/forgot-password">Quên mật khẩu</Link>
                        </div>
                    </div>
                    <div className="mt-3 grid place-items-center">
                        <span className="text-sm font-semibold">
                            BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ{" "}
                            <Link className="text-gray-400 hover:text-black" to="/register">
                                TẠI ĐÂY.
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

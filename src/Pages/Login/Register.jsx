import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const Register = () => {
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
                        Đăng ký tài khoản
                    </a>
                </div>
            </div>

            <div className="max-w-md mx-auto mt-5 px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="text-2xl font-semibold uppercase tracking-wider text-center mb-6">
                        Đăng ký tài khoản
                    </div>
                </div>

                <div className="mt-4 mb-4">
                    <p className="mb-2 text-lg">
                        Họ và tên <span className="text-red-500">*</span>
                    </p>
                    <input
                        className="w-full p-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Nhập họ và tên"
                    />
                    <p className="mb-2 mt-6 text-lg">
                        Email <span className="text-red-500">*</span>
                    </p>
                    <input
                        className="w-full p-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        placeholder="Nhập địa chỉ Email"
                    />
                    <p className="mb-2 mt-6 text-lg">
                        Mật Khẩu <span className="text-red-500">*</span>
                    </p>
                    <input
                        className="w-full p-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Nhập mật khẩu"
                    />
                    <p className="mb-2 mt-6 text-lg">
                        Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </p>
                    <input
                        className="w-full p-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                    />
                    <div className="mt-8 grid place-items-center">
                        <button className="bg-black text-white px-16 py-3 rounded-md tracking-wider text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            ĐĂNG KÝ
                        </button>
                        <div className="py-3 text-gray-400 text-sm hover:text-black">
                            <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
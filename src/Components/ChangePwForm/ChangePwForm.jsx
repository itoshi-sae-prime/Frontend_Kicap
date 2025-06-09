import axios from "axios";
import { useState } from "react";

const ChangePwForm = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp.");
            return;
        }
        if (newPassword == "" || oldPassword == "" || confirmPassword == "") {
            setMessage("Không được để trống");
            return;
        }
        try {
            const token = localStorage.getItem("token"); // JWT token
            const response = await axios.post(
                "/user/change_password",
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setConfirmPassword("");
            setOldPassword("");
            setPassword("");
            setIsSuccess(true);
            setMessage("Đổi mật khẩu thành công!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Đã xảy ra lỗi.");
        }
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Đổi mật khẩu</h1>
            <form className="bg-white rounded pt-2 pb-8 mb-4" onSubmit={handleChangePassword}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current-password">
                        Mật khẩu hiện tại
                    </label>
                    <input
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type="password"
                        id="current-password"
                        placeholder="Nhập mật khẩu hiện tại"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                        Mật khẩu mới
                    </label>
                    <input
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="new-password"
                        placeholder="Nhập mật khẩu mới"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                        Xác nhận mật khẩu mới
                    </label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirm-password"
                        placeholder="Xác nhận mật khẩu mới"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Đổi mật khẩu
                </button>

            </form>
            {message && (
                <p
                    className={`mt-4 text-center font-semibold transition-all duration-300 ease-in-out shadow-lg ${isSuccess ? "text-green-500 border border-green-500" : "text-red-500 border border-red-500"
                        } rounded p-2 transform scale-105`}
                >
                    {message}
                </p>
            )}


        </div>
    )
}
export default ChangePwForm;
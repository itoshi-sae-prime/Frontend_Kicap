import { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token"); // nếu có token
                const response = await axios.get('https://backend-kicap.onrender.com/api/user/order/email', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setOrders(Array.isArray(response.data) ? response.data : [response.data]);
            } catch (err) {
                setError("Hiện tại không có đơn hàng nào .");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(value);
    };

    return (
        <div className="order-history">
            <h1 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h1>
            <p className="mb-4">Xem lại các đơn hàng đã đặt của bạn.</p>

            {loading ? (
                <p>Đang tải đơn hàng...</p>
            ) : error ? (
                <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-lg font-medium shadow-sm">
                    {error}
                </p>
            ) : orders.length === 0 ? (
                <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-lg font-medium shadow-sm">Chưa có đơn hàng nào được đặt.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="py-2 px-4">Đơn hàng</th>
                                <th className="py-2 px-4">Ngày</th>
                                <th className="py-2 px-4">Địa chỉ</th>
                                <th className="py-2 px-4">Giá trị đơn hàng</th>
                                <th className="py-2 px-4">TT thanh toán</th>
                                <th className="py-2 px-4">TT vận chuyển</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-t">
                                    <td className="py-2 px-4">{order.order_id}</td>
                                    <td className="py-2 px-4">{formatDate(order.created_at)}</td>
                                    <td className="py-2 px-4">{order.address}</td>
                                    <td className="py-2 px-4">{order.total}.000d</td>
                                    <td className="py-2 px-4">Chưa thanh toán</td>
                                    <td className="py-2 px-4">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;

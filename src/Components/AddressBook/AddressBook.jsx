import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { GrRadialSelected } from "react-icons/gr";
const AddressBook = (prop) => {
    const { modal, setModal, editingAddress, setEditingAddress } = prop;
    const [address, setAddress] = useState([]);
    console.log(address);
    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa địa chỉ này?");
        if (!confirmDelete) return;
        console.log(_id);
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/user/mes/delete/address/${_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAddress(prev => prev.filter(addr => addr._id !== _id));
            alert("Đã xóa thành công!");
        } catch (err) {
            console.error("Lỗi khi xóa:", err);
            alert("Xóa thất bại!");
        }
    };
    const handleEdit = (addr) => {
        setEditingAddress(addr);
        setModal(prev => !prev); // Hiện modal hoặc form nhập
        console.log(modal);
    }
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = localStorage.getItem("token"); // nếu có token
                const response = await axios.get('/user/mes/address', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setAddress(response.data);
                console.log(address);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách địa chỉ:', error);
            }
        };
        fetchAddresses();
    }, []);

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-3">Sổ địa chỉ</h1>

            {address.length === 0 ? (
                <p className="text-gray-500 italic font-bold">Chưa có địa chỉ nào.</p>
            ) : (
                <div className="max-h-[400px] overflow-y-auto">
                    {address.map((addr, index) => (
                        <div key={index} className="flex justify-between items-start border p-4 mb-4 rounded-md bg-gray-50 shadow-sm">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h2 className="text-lg font-semibold">{addr.name}</h2>
                                    {addr.is_default && (
                                        <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded">Mặc định</span>
                                    )}
                                </div>
                                <p><strong>SĐT:</strong> {addr.phone}</p>
                                <p><strong>Công ty:</strong> {addr.company}</p>
                                <p><strong>Địa chỉ:</strong> {`${addr.address}, ${addr.ward}, ${addr.district}, ${addr.province}`}</p>
                                <p><strong>Mã bưu điện:</strong> {addr.zip}</p>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                                <button
                                    className="bg-blue-300 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <GrRadialSelected />
                                </button>
                                <button
                                    onClick={() => handleEdit(addr)}
                                    className="bg-black hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <MdOutlineAutoFixHigh />
                                </button>
                                <button onClick={() => handleDelete(addr._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow"
                                >
                                    <MdOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            )}

            <button
                onClick={() => setModal(prev => !prev)}
                className="bg-black mt-3 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Thêm địa chỉ mới
            </button>
        </div>
    );
}
export default AddressBook;
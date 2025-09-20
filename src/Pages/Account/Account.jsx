import React from "react";
import axios from "axios";
import pcVN from 'pc-vn';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";
import OrderHistory from "../../Components/Orderhistory/Orderhistory";
import AddressBook from "../../Components/AddressBook/AddressBook";
import ChangePwForm from "../../Components/ChangePwForm/ChangePwForm";
import { IoMdReturnLeft } from "react-icons/io";
const AccountPage = () => {
    const token = localStorage.getItem('token');
    // const [addressList, setAddressList] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);
    console.log(editingAddress);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedTab, setSelectedTab] = useState('info');
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [modal, setModal] = useState(true);
    const [formData, setFormData] = useState({
        user_id: user._id,
        name: '',
        phone: '',
        company: '',
        address: '',
        zip: '', // ZIP code
    });

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        const selectedProvinceName = provinces.find(p => p.code === selectedProvince)?.name || '';
        const selectedDistrictName = districts.find(d => d.code === selectedDistrict)?.name || '';
        const selectedWardName = wards.find(w => w.code === selectedWard)?.name || '';
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ.");
            return;
        }

        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneRegex.test(formData.phone)) {
            alert("Số điện thoại không hợp lệ.");
            return;
        }

        if (formData.code && !/^\d{5,6}$/.test(formData.code)) {
            alert("Mã bưu điện phải là 5 hoặc 6 chữ số.");
            return;
        }

        if (!selectedProvince || !selectedDistrict || !selectedWard) {
            alert("Vui lòng chọn đầy đủ Tỉnh/TP, Quận/Huyện và Phường/Xã.");
            return;
        }
        const finalData = {
            ...formData,
            province: selectedProvinceName,
            district: selectedDistrictName,
            ward: selectedWardName,
        };
        try {
            const res = await axios.post(`https://backend-kicap.onrender.com/api/user/update_address`, finalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Dữ liệu đã được gửi thành công:", res.data);
            // setAddressList(res.data);
            setModal(false);
            alert("Đã thêm thành công");
        }
        catch (error) {
            console.error("Lỗi:", error);
            alert("Đã xảy ra lỗi khi gửi dữ liệu.");
        }
    };
    useEffect(() => {
        const getUser = async () => {
            try {
                const respone = await axios.get("https://backend-kicap.onrender.com/api/user/mes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (respone.status === 200) {
                    setUser(respone.data);
                    console.log(respone.data);
                } else {
                    setError("Không thể lấy thông tin người dùng");
                }
            } catch (error) {
                setError(error.message); // Xử lý lỗi
            }
        }
        getUser();
        // if (editingAddress) {
        //     setFormData({
        //         user_id: editingAddress.user_id,
        //         name: editingAddress.name || '',
        //         phone: editingAddress.phone || '',
        //         company: editingAddress.company || '',
        //         address: editingAddress.address || '',
        //         zip: editingAddress.zip || '',
        //     });

        //     setSelectedProvince(editingAddress.provinceCode || '');
        //     setDistricts(pcVN.getDistrictsByProvinceCode(editingAddress.provinceCode));
        //     setSelectedDistrict(editingAddress.districtCode || '');
        //     setWards(pcVN.getWardsByDistrictCode(editingAddress.districtCode));
        //     setSelectedWard(editingAddress.wardCode || '');
        // }
        // else {
        //     setFormData({
        //         user_id: user._id,
        //         name: '',
        //         phone: '',
        //         company: '',
        //         address: '',
        //         zip: '',
        //     })
        // }
        const provs = pcVN.getProvinces();
        setProvinces(provs);

    }, []);
    const handleProvinceChange = (e) => {
        const code = e.target.value;
        setSelectedProvince(code);
        setDistricts(pcVN.getDistrictsByProvinceCode(code));
        setSelectedDistrict('');
        setWards([]);
    };

    const handleDistrictChange = (e) => {
        const code = e.target.value;
        setSelectedDistrict(code);
        setWards(pcVN.getWardsByDistrictCode(code));
        setSelectedWard('');
    };

    return (
        <div className="p-4">
            {
                !modal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
                        <div className="bg-white px-6 py-3 rounded-lg shadow-lg z-10 w-[100%] max-w-3xl">
                            <div className="flex items-center justify-between mb-2 border-b-2 pb-2">
                                <h2 className="text-lg font-bold text-gray-800 font-sans uppercase">
                                    Thêm địa chỉ mới
                                </h2>
                                <button
                                    onClick={() => setModal(prev => !prev)}
                                    className="text-xl w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800 transition"
                                    aria-label="Đóng"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-2 hidden">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">ID</label>
                                    <input
                                        readOnly
                                        value={formData.user_id}
                                        onChange={handleInputChange}
                                        name="user_id"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="id"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">Họ tên</label>
                                    <input
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        name="name"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Họ tên"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">Số điện thoại</label>
                                    <input
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        name="phone"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">Công ty</label>
                                    <input
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        name="company"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Công ty"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">Địa chỉ</label>
                                    <input
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        name="address"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Địa chỉ"
                                    />
                                </div>
                                {/* <div className="mb-2">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">Quốc gia</label>
                                    <input
                                        name="address"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Địa chỉ"
                                    />
                                </div> */}
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-3">
                                            {/* Province */}
                                            <div>
                                                <label className="pb-2 uppercase text-[13px] tracking-wide">Tỉnh thành</label>
                                                <select
                                                    value={selectedProvince}
                                                    onChange={handleProvinceChange}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md"
                                                >
                                                    <option value="">Chọn tỉnh</option>
                                                    {provinces.map((prov) => (
                                                        <option key={prov.code} value={prov.code}>
                                                            {prov.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* District */}
                                            <div>
                                                <label className="pb-2 uppercase text-[13px] tracking-wide">Quận huyện</label>
                                                <select
                                                    value={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md"
                                                    disabled={!selectedProvince}
                                                >
                                                    <option value="">Chọn quận/huyện</option>
                                                    {districts.map((dist) => (
                                                        <option key={dist.code} value={dist.code}>
                                                            {dist.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Ward */}
                                            <div>
                                                <label className="pb-2 uppercase text-[13px] tracking-wide">Phường xã</label>
                                                <select
                                                    value={selectedWard}
                                                    onChange={(e) => setSelectedWard(e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md"
                                                    disabled={!selectedDistrict}
                                                >
                                                    <option value="">Chọn phường/xã</option>
                                                    {wards.map((ward) => (
                                                        <option key={ward.code} value={ward.code}>
                                                            {ward.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="pb-2 uppercase text-[13px] tracking-wide">Mã Zip</label>
                                    <input
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        name="zip"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Mã Zip"
                                    />
                                </div>

                                <div className="flex justify-end mt-[30px] gap-x-3">
                                    <button
                                        type="submit"
                                        className="hover:bg-green-500 text-white px-4 py-2 rounded-md bg-black uppercase font-semibold tracking-wider"
                                    >
                                        Thêm địa chỉ
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            <div className="flex items-center gap-2 mb-4">
                <Link to="/">Trang chủ</Link>
                <span className="text-gray-500">/</span>
                <span className="text- font-semibold">Trang khách hàng</span>
            </div>
            <div className="flex justify-between mb-4">
                <div className="w-[40%]">
                    <h1 className="font-bold sm:text-[20px] md:text-[30px] lg:text-[40px]">Trang Tài Khoản</h1>
                    {user ? (
                        <div className="mt-[25px] text-[20px]">
                            <h2><strong>Xin chào</strong> {user.name}.</h2>
                        </div>
                    ) : (
                        <p>Đang tải thông tin người dùng...</p>
                    )}
                    <div className="mt-[30px] flex flex-col justify-start items-start gap-4">
                        <button
                            className={`text-[20px] font-semibold ${selectedTab === 'info' ? 'text-blue-500' : ''}`}
                            onClick={() => setSelectedTab('info')}
                        >
                            Thông tin tài khoản
                        </button>
                        <button
                            className={`text-[20px] font-semibold ${selectedTab === 'orders' ? 'text-blue-500' : ''}`}
                            onClick={() => setSelectedTab('orders')}
                        >
                            Đơn hàng của bạn
                        </button>
                        <button
                            className={`text-[20px] font-semibold ${selectedTab === 'password' ? 'text-blue-500' : ''}`}
                            onClick={() => setSelectedTab('password')}
                        >
                            Đổi mật khẩu
                        </button>
                        <button
                            className={`text-[20px] font-semibold ${selectedTab === 'address' ? 'text-blue-500' : ''}`}
                            onClick={() => setSelectedTab('address')}
                        >
                            Sổ địa chỉ
                        </button>
                    </div>
                </div>
                <div className="h-full w-full">
                    <div className="h-[500px] ">
                        {selectedTab === 'info' && <AccountInfo user={user} />}
                        {selectedTab === 'orders' && <OrderHistory user={user} />}
                        {selectedTab === 'password' && <ChangePwForm />}
                        {selectedTab === 'address' && <AddressBook
                            modal={modal}
                            setModal={setModal}
                            editingAddress={editingAddress}
                            setEditingAddress={setEditingAddress} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AccountPage;

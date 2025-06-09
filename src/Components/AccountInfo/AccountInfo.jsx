const AccountInfo = (props) => {
    const { user } = props;
    console.log(user); // Vẫn giữ lại console.log để theo dõi

    return (
        <>
            <div className="flex flex-col gap-4 bg-white rounded-lg">
                <h2 className="text-2xl font-bold">Thông tin tài khoản</h2>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">ID:</label>
                    <input
                        type="text"
                        className="border shadow border-gray-300 p-2 rounded"
                        value={user ? user._id : ''} // Hiển thị user.id nếu user tồn tại, ngược lại hiển thị chuỗi rỗng
                        readOnly // Thường thì ID không cho phép người dùng chỉnh sửa
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Họ và tên:</label>
                    <input
                        type="text"
                        className="border shadow border-gray-300 p-2 rounded"
                        placeholder="Nhập họ và tên"
                        value={user ? user.name : ''} // Hiển thị user.name nếu user tồn tại, ngược lại hiển thị chuỗi rỗng
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Email:</label>
                    <input type="email" className="border shadow border-gray-300 p-2 rounded" placeholder="Nhập email" value={user ? user.email : ''} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Số điện thoại:</label>
                    <input type="tel" className="border shadow border-gray-300 p-2 rounded" placeholder="Nhập số điện thoại" value={user ? user.phone : ''} />
                </div>
                <button className="bg-black mt-3 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cập nhật thông tin
                </button>
            </div>
        </>
    );
};
export default AccountInfo;
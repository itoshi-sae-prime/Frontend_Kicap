import axios from "axios";
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { updateCard } from "../../Redux/Slice/cardSlice";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiShieldCheckFill } from "react-icons/pi";
import { BsFillAwardFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";
import TinTuc from "../../Components/Post/TinTuc";
import { useDispatch, useSelector } from "react-redux";
const PDPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.allCart);
    // console.log(cart.cart[0]?.quantity);
    const { slug } = useParams();
    const location = useLocation();
    const category = location.state?.category;
    const [keycap, setKeycap] = useState({});
    const [soluong, setSoluong] = useState(1);
    const [sendEvaluat, setSendRate] = useState(false);
    const [mota, setMota] = useState(true);
    const [nhanxet, setNhanxet] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/orders/sendEvalute`, form);
            console.log("Dữ liệu đã được gửi thành công:", res.data);
            const alertDiv = document.createElement("div");
            alertDiv.innerText = "✅ Đã gửi đánh giá thành công!";
            alertDiv.style.position = "fixed";
            alertDiv.style.top = "90px";
            alertDiv.style.right = "20px";
            alertDiv.style.padding = "10px 20px";
            alertDiv.style.background = "green";
            alertDiv.style.color = "white";
            alertDiv.style.borderRadius = "5px";
            alertDiv.style.zIndex = "1000";
            document.body.appendChild(alertDiv);
            setForm({ name: "", email: "", phone: "", message: "" });
            setSendRate(!sendEvaluat);
            setTimeout(() => {
                alertDiv.remove();
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error.response.data);
            const alertDiv = document.createElement("div");
            alertDiv.innerText = "❌ Đã xảy ra lỗi khi gửi đánh giá!";
            alertDiv.style.position = "fixed";
            alertDiv.style.top = "90px";
            alertDiv.style.right = "20px";
            alertDiv.style.padding = "10px 20px";
            alertDiv.style.background = "red";
            alertDiv.style.color = "white";
            alertDiv.style.borderRadius = "5px";
            alertDiv.style.zIndex = "1000";
            document.body.appendChild(alertDiv);
            setTimeout(() => {
                alertDiv.remove();
            }, 2000);
            // Có thể hiển thị thông báo lỗi cho người dùng
        }
    };

    useEffect(() => {
        const getKeycap = async () => {
            try {
                const res = await axios.get(`/products/${category}/${slug}`);
                setKeycap(res.data);
            } catch (error) {
                console.log("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
        };
        getKeycap();
    }, [slug]);
    const handleAddToCart = (product) => {
        dispatch(updateCard({
            ...product,
            quantity: soluong // VD: 2
        }));
        const alertDiv = document.createElement("div");
        alertDiv.innerText = "✅ Đã thêm vào giỏ hàng!";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "90px";
        alertDiv.style.right = "20px";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.background = "green";
        alertDiv.style.color = "white";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.zIndex = "1000";
        document.body.appendChild(alertDiv);
        // Xóa thông báo sau 2 giây
        setTimeout(() => {
            alertDiv.remove();
        }, 2000);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const ChoiceStart = (e) => {
        // e.target.style.text = "yellow";
    }
    const Subtract = () => {
        if (soluong > 1) {
            setSoluong(soluong => soluong - 1)
        }
        return 1;
    }
    const Plus = () => {
        setSoluong(soluong => soluong + 1)
    }
    const MotaButton = () => {
        if (mota === false) {
            setMota(true);
            setNhanxet(false);
        }
    }
    const NhanXetButton = () => {
        if (nhanxet === false) {
            setNhanxet(true);
            setMota(false);
        }
    }
    const SendevaluateButton = () => {
        setSendRate(!sendEvaluat);
    }
    return (
        <div className="">
            {
                sendEvaluat && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg z-0 w-[100%] max-w-lg">
                            <div className="flex">
                                <button onClick={SendevaluateButton} className="text-[20px] rounded-md px-3 py-2 bg-black text-white hover:text-gray-700">
                                    <IoMdReturnLeft />
                                </button>
                            </div>
                            <h2 className="text-[14px] leading-5 font-medium mb-2 text-center font-sans">Đánh giá sản phẩm</h2>
                            <h3 className="text-[16px] leading-5 font-bold mb-3 text-center">{keycap.title}</h3>
                            <div className="flex justify-center gap-x-2">
                                <h2 className="text-[12px] leading-5 font-medium mb-2 text-center">Đánh giá của bạn về sản phẩm:</h2>
                                <div className="flex">
                                    <CiStar className="" style={{ fontSize: "20px" }} onClick={ChoiceStart} />
                                    <CiStar className="" style={{ fontSize: "20px" }} />
                                    <CiStar className="" style={{ fontSize: "20px" }} />
                                    <CiStar className="" style={{ fontSize: "20px" }} />
                                    <CiStar className="" style={{ fontSize: "20px" }} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">

                                    <input
                                        value={form.name}
                                        onChange={handleChange}
                                        name="name"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md decoration-none"
                                        placeholder="Nhập tên của bạn"
                                    />
                                </div>
                                <div className="flex mb-3 gap-x-5">
                                    <input
                                        value={form.email}
                                        onChange={handleChange}
                                        name="email"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md "
                                        placeholder="Nhập email của bạn"
                                    />
                                    <input
                                        value={form.phone}
                                        onChange={handleChange}
                                        name="phone"
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500 rounded-md "
                                        placeholder="Nhập số điện thoại của bạn"
                                    />
                                </div>
                                <div className="mb-3 border border-gray-500 rounded-md">
                                    <textarea
                                        value={form.message}
                                        onChange={handleChange}
                                        name="message"
                                        type="text"
                                        className="w-full min-h-[100px] px-3 py-2 text-[12px]  "
                                        placeholder="Nhập nội dung đánh giá của bạn về sản phẩm này"
                                    />
                                    {/* <input
                                        type="text"
                                        className="w-full px-3 py-2 text-[12px] border border-gray-500"
                                        placeholder="Nhập số điện thoại của bạn"
                                    /> */}
                                </div>
                                <div className="flex justify-end mt-[30px]">
                                    <button
                                        type="submit"
                                        className="hover:bg-green-500 text-white px-4 py-2 rounded-md bg-green-400 "
                                    >
                                        Gửi đánh giá
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            <div className="container mx-auto gap-x-[10px] mt-[5px]">
                <div className="flex justify-start items-center border-y border-y-1 my-[10px] py-[10px] w-full">
                    <Link to="/" className="px-[10px] text-[14px]">Trang chủ</Link>
                    <div className="pt-[5px]"><MdNavigateNext /></div>
                    <Link to={`/${keycap.category}`} className="px-[10px] text-[14px]">{keycap.type}</Link>
                    <div className="pt-[5px]"><MdNavigateNext /></div>
                    <Link to={`/${keycap.title}`} className="px-[10px] text-[14px]">{keycap.title}</Link>
                </div>
                <div className="grid grid-cols-1 gap-x-5 lg:mt-[20px]">
                    <div key={keycap.tittle} className="lg:flex md:grid md:grid-cols-1">
                        {/* Product Image Section */}
                        <div className="w-full ">
                            {/* Ảnh chính */}
                            <img
                                className="w-full h-[600px] object-contain"
                                src={keycap.images?.[0]?.startsWith("http") ? keycap.images[0] : `https:${keycap.images?.[0]}`}
                                alt={keycap.title}
                            />

                            {/* Ảnh nhỏ bên dưới */}
                            <div className="grid grid-cols-5 justify-center gap-2 overflow-x-auto max-h-[100px] mt-2 p-2">
                                {keycap.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        className="w-full h-[90px] object-contain border border-white hover:border-yellow-300 transition duration-200"
                                        src={image?.startsWith("http") ? image : `https:${image}`}
                                        alt={`${keycap.title} ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="w-full ">
                            <div className="w-full h-auto grid gap-y-2">
                                <div className="grid lg:gap-y-1 gap-y-3 justify-center lg:justify-start items-center">
                                    <div className="text-[26px] leading-[29px] font-semibold uppercase tracking-wider py-1">{keycap.title}</div>

                                    <div className="flex justify-center lg:justify-start items-center gap-x-2">
                                        <CiStar className="" style={{ fontSize: "20px" }} onClick={ChoiceStart} />
                                        <CiStar className="" style={{ fontSize: "20px" }} />
                                        <CiStar className="" style={{ fontSize: "20px" }} />
                                        <CiStar className="" style={{ fontSize: "20px" }} />
                                        <CiStar className="" style={{ fontSize: "20px" }} />
                                        <div className="text-green-400 ml-[10px]">Viết đánh giá của bạn</div>
                                    </div>
                                </div>
                                <div className="grid justify-center lg:justify-start gap-y-1">
                                    {/* Pricing Section */}
                                    <div className="flex items-center">
                                        <div className="text-[24px] font-semibold inline-block">{keycap.price}</div>
                                        {keycap.sale_price &&
                                            <div className="flex">
                                                <p className="text-[15px] pl-[15px] inline-block pt-[2px] font-semibold">Giá thị trường:</p>
                                                <p className="text-[20px] pl-[10px] text-gray-400 line-through">{keycap.sale_price}</p>
                                            </div>
                                        }
                                    </div>

                                    {/* Discount & Availability Section */}
                                    <div className="flex lg:block justify-between items-center">
                                        <div className="text-[14px] font-[600] flex">
                                            <p className="text-[14px] font-[600]">Tiết kiệm:</p>
                                            {
                                                keycap?.sale_price && keycap?.price ? (
                                                    <p className="inline-block px-[5px] text-black font-extrabold">
                                                        {(
                                                            Number(keycap.sale_price.replace(/[₫.]/g, "")) -
                                                            Number(keycap.price.replace(/[₫.]/g, ""))
                                                        ).toLocaleString("vi-VN")}₫
                                                    </p>
                                                ) : (
                                                    <p className="inline-block px-[5px] text-black font-extrabold">
                                                        Đang cập nhật
                                                    </p>
                                                )
                                            }
                                        </div>
                                        <div className="text-[14px] font-[600]">
                                            Tình trạng: <p className="inline-block px-[5px] text-red-500 font-[500]">Còn hàng</p>
                                        </div>

                                    </div>
                                </div>
                                {/* Rating Section */}

                                {/* Quantity Section */}
                                <div className="flex justify-center lg:justify-start items-center gap-x-2">
                                    <div className="inline-block mt-[12px] font-[600]">
                                        Số lượng:
                                        <div className="inline-block border-1 ml-[20px]">
                                            <button onClick={Subtract} className="px-[15px] py-[5px] bo inline-block">-</button>
                                            <div className="px-[15px] inline-block text-black font-semibold w-[50px] text-center">{soluong}</div>
                                            <button onClick={Plus} className="px-[15px] py-[5px] bo">+</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Purchase Section */}
                                <button
                                    onClick={() => handleAddToCart(keycap)}
                                    className="w-full lg:w-[60%] bg-black text-white mt-[15px] py-[5px] font-[500] hover:bg-gray-300 transition-colors duration-300"
                                >
                                    <div className="hover:bg-gray-300 transition-colors duration-300 hover:text-black">
                                        <span className="uppercase pt-[5px]">Thêm vào giỏ hàng</span>
                                        <br />
                                        <span className="text-[13px] tracking-wide pb-[5px]">Giao hàng toàn quốc</span>
                                    </div>
                                </button>


                                {/* Add to Wishlist Section */}
                                {/* <button className="flex border-2 mt-[15px]">
                                <div className="my-auto p-[20px] text-[17px]">
                                    <FaRegHeart />
                                </div>
                                <div className="border-[1px] p-[15px] font-semibold">Thêm vào yêu thích</div>
                            </button> */}

                                {/* Customer Service */}
                                <div className="mt-[5px] font-semibold text-[15px]">Gọi đặt mua: <span className="ml-[5px] text-blue-500 font-semibold">0369161095</span>  (miễn phí 8:30 - 21:30).</div>

                                {/* Shipping & Warranty Section */}
                                <div className="mt-[10px]">
                                    <div className="py-[7px] uppercase my-auto">
                                        <MdOutlineLocalShipping className="text-[45px] inline-block mr-[20px]" />
                                        <span className="font-[500]">FREESHIP</span> với đơn hàng <span className="font-[500]">từ 800.000đ</span>
                                    </div>
                                    <div className="py-[7px] uppercase">
                                        <PiShieldCheckFill className="text-[45px] inline-block mr-[20px]" />
                                        <a className="text-blue-500" href="#">Chính sách bảo hành</a>
                                    </div>
                                    <div className="py-[7px] uppercase">
                                        <BsFillAwardFill className="text-[45px] inline-block mr-[20px]" />
                                        Cam kết <span className="font-[500]">100% chính hãng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[30px] relative">
                    <div className="flex pt-[8px]">
                        <button onClick={MotaButton} className="py-[12px] mr-[22px] font-semibold uppercase text-[18px] border-b-2 hover:border-b-2 hover:border-neutral-950 relative z-10">Mô tả</button>
                        <button onClick={NhanXetButton} className="py-[12px] mx-[22px] font-semibold uppercase text-[18px] border-b-2 hover:border-b-2 hover:border-neutral-950 relative z-10">Nhận xét sản phẩm</button>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 border-b-2"></div>
                </div>
                {
                    mota &&
                    <div className="mt-[20px]">
                        <p className="py-[5px]">Bộ keycap được sản xuất lại dựa trên thiết kế cả INKY x DOMIKEY</p>
                        <div>
                            <table className="w-[100%] border-2 border-black">
                                <tr className="border-2 font-semibold text-[15px] py-[10px] border-black">
                                    <td className="py-[10px] w-[50%]">Thông số kỹ thuật</td>
                                    <td className="py-[10px] w-[50%]">Giá trị</td>
                                </tr>
                                <tr>
                                    <td>Profile</td>
                                    <td>Cherry</td>
                                </tr>
                                <tr>
                                    <td>Chất liệu</td>
                                    <td>PBT dyesub</td>
                                </tr>
                                <tr>
                                    <td>Số lượng phím</td>
                                    <td>152</td>
                                </tr>
                                <tr>
                                    <td>Độ dày</td>
                                    <td>1.6mm</td>
                                </tr>
                                <tr>
                                    <td>Tương thích</td>
                                    <td>Hầu hết các bàn phím cơ</td>
                                </tr>
                            </table>
                        </div>
                        <div className="py-[5px]">
                            <strong >Chỉ là keycap, không bao gồm bàn phím.</strong>
                        </div>
                    </div>
                }
                {
                    nhanxet && <div className="mt-[20px]">
                        <div className="w-full h-auto bg-green-200">
                            <div class="py-[35px] text-center boder-2 border-green-100">
                                <div>Hiện tại sản phẩm chưa có đánh giá nào. bạn hãy trở thành người đầu tiên đánh giá cho sản phẩm này</div>
                                <button onClick={SendevaluateButton} className="bg-green-500 text-white px-[20px] py-[7px] ml-[10px] mt-[20px] rounded-lg">Gửi đánh giá của bạn </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="py-[30px] hidden lg:block">
                    <div className="uppercase my-[30px] text-center text-[30px] tracking-wider">Sản phẩm <strong>liên quan</strong></div>
                    <TinTuc />
                </div>

            </div >
        </div>
    );
}
export default PDPage; 
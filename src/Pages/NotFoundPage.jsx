import { Link } from "react-router-dom";

const NFPage = () => {
    return (
        <div className="flex items-center justify-center my-[5rem] px-4">
            <div className="px-10 rounded-3xl text-center w-full h-[50%]">
                <div className="flex justify-center mb-4">
                    <img src="https://bizweb.dktcdn.net/100/436/596/themes/980306/assets/404.png?1745733698908" alt="" />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="sm:text-[25px] md:text-[35px] text-[45px] text-gray-700 mb-2 font-thin">Lỗi không tìm thấy trang</h1>
                    <p className="font-mono">Có vẻ như các trang mà bạn đang cố gắng tiếp cận không tồn tại nữa hoặc có thể nó vừa di chuyển.</p>
                    <Link
                        to="/"
                        className=" bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-md transition duration-300 mt-[10px]"
                    >
                        Quay lại trang chủ
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NFPage;

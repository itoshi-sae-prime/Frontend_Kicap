import { useEffect, useState } from "react";
import axios from "axios";

const TinTuc = () => {
    const [productPic, setProductPic] = useState([]);

    useEffect(() => {
        const getProductPic = async () => {
            try {
                const res = await axios.get("https://backend-kicap.onrender.com/api/posts/blog");
                // Giả sử API trả về { data: [...] }
                const list = Array.isArray(res.data.data) ? res.data.data : [];
                setProductPic(list);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setProductPic([]); // fallback để không crash
            }
        };
        getProductPic();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(productPic) && productPic.length > 0 ? (
                productPic.map((item, index) => (
                    <div
                        key={index}
                        className="flex sm:flex-row lg:flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-full lg:h-48 object-cover"
                            src={item.images}
                            alt={item.title}
                        />
                        <div className="p-2 border-b-2 flex-1">
                            <a
                                href="#"
                                className="block text-base md:text-lg font-semibold uppercase tracking-wide text-gray-800 hover:text-blue-500 truncate"
                            >
                                {item.title}
                            </a>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                {item.content}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500">
                    Không có dữ liệu bài viết
                </p>
            )}
        </div>
    );
};

export default TinTuc;

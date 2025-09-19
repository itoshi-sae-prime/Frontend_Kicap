import { useEffect, useState } from "react";
import axios from "axios";
const TinTuc = () => {
    const [Productpic, setProductPic] = useState([]);
    useEffect(() => {
        const getProductPic = async () => {
            try {
                await axios({
                    method: 'GET',
                    url: `https://backend-kicap.onrender.com/api/posts/blog`,
                }).then((res) => {
                    setProductPic(res.data)
                    // console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                });
            } catch (error) {
                console.log(error);
            }
        };
        getProductPic();
    }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Productpic.map((item) => (
                <div
                    key={item.title}
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
            ))}
        </div>

    )
}
export default TinTuc;

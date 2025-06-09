import { useEffect, useState } from "react";
import axios from "axios";
import ListPost from "./ListPost/ListPost";
import TinTuc from "./TinTuc";
const Post = () => {
    const [producpic, setProductPic] = useState([]);
    useEffect(() => {
        const getProducPic = async () => {
            try {
                await axios({
                    method: 'GET',
                    url: `products/v1 `,
                }).then((res) => {
                    const filteredData = res.data.slice(4);
                    setProductPic(filteredData)
                    // console.log(filteredData)
                }).catch((err) => {
                    console.log(err)
                });
            } catch (error) {
                console.log(error);
            }

        };
        getProducPic();
    }, []);
    return (
        <>
            <div className="text-center sm:text-[15px] md:text-[20px] lg:text-[25px] tracking-[7px] py-[30px]">SẢN PHẨM <strong>MỚI</strong></div>
            <ListPost data={producpic.slice(4, 8)} title="Xem tất cả, sản phẩm mới" />
            <div className="text-center sm:text-[15px] md:text-[20px] lg:text-[25px] tracking-[7px] py-[40px] uppercase">Bàn phím cơ <strong>Custom</strong></div>
            <ListPost data={producpic.slice(9, 16)} title="Xem tất cả, bàn phím cơ custom" />
            <div className="text-center sm:text-[15px] md:text-[20px] lg:text-[25px] tracking-[7px] py-[40px] uppercase">Bàn phím cơ <strong>KEYCAP SA OSIRIS</strong></div>
            <ListPost data={producpic.slice(17, 24)} title="Xem tất cả, sản phẩm mới" />
            <div className="py-10 w-full">
                <div className="flex justify-center items-center">
                    <img
                        className="w-2/4 sm:w-full md:w-2/3 lg:w-1/3 sm:object-contain"
                        src="https://png.pngtree.com/png-clipart/20220605/original/pngtree-hello-summer-text-effect-png-image_7948371.png"
                        alt="Hello Summer"
                    />
                </div>
            </div>
            <div className="text-center sm:text-[15px] md:text-[20px] lg:text-[25px] tracking-[7px] py-[40px] uppercase">Bàn phím cơ <strong>Custom</strong></div>
            <ListPost data={producpic.slice(25, 32)} title="Xem tất cả, phụ kiện cho bàn phím cơ" />
            <div className="text-center sm:text-[15px] md:text-[20px] lg:text-[25px] tracking-[7px] py-[40px] uppercase">Tin tức<strong> KICAP</strong></div>
            <TinTuc />
        </>
    );
}
export default Post;
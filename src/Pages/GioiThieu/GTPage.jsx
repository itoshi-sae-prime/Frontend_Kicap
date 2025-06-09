const GTPage = () => {
    return (
        <div className="pt-2 sm:pt-4 md:pt-6">
            <div className="relative">
                <img
                    className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                    src="https://bizweb.dktcdn.net/100/436/596/themes/834446/assets/evo-page-banner.jpg?1704470384648"
                    alt=""
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase">
                    Giới thiệu
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="text-base sm:text-lg md:text-xl text-center font-semibold">
                    KICAP - MORE INSPIRATIONAL!
                    <div className="text-sm sm:text-base">/ki - cáp/!</div>
                    <div className="text-sm sm:text-base mt-1">
                        Chúng tôi ra đời với sứ mệnh mang đến không gian làm việc độc đáo và sáng tạo cho mọi người.
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
                    <img
                        className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-cover"
                        src="https://bizweb.dktcdn.net/thumb/medium/100/436/596/files/z2645819303628-d961c9e7739b7d89cc51db88ad9e94f6-cef7b3e6-2e49-4f7c-a53e-d0d933c58ec6.jpg?v=1631202888004"
                        alt=""
                    />
                    <img
                        className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] object-cover"
                        src="https://bizweb.dktcdn.net/thumb/grande/100/436/596/files/158795710-525043295127859-5240130807423059829-n.jpg?v=1631204621672"
                        alt=""
                    />
                </div>

                <div className="mt-8 text-xs sm:text-sm md:text-base text-center sm:text-left sm:ml-[20%] lg:ml-[25%] xl:ml-[30%]">
                    <p><strong>CẢM HỨNG HƠN?</strong></p>
                    <p>Đó luôn là mục tiêu chúng tôi hướng đến.</p>
                    <p>Và cũng là tinh thần "More inspirational" chúng tôi khát khao truyền tải.</p>
                    <p>Với những sản phẩm được lựa chọn một cách tỉ mỉ và cẩn thận trong khâu đánh giá chất lượng. Chắc chắn, điều này sẽ giúp các bạn có một trải nghiệm hoàn hảo khi sử dụng sản phẩm của chúng tôi.</p>
                    <p>Chúc các bạn luôn vui vẻ, sáng tạo và tràn đầy năng lượng mỗi khi bắt đầu làm việc. Thanks!</p>
                </div>
            </div>
        </div>
    );
}

export default GTPage;
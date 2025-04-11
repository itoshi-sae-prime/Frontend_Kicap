import ProductList from "./ProductList";
const AllPage = (props) => {
    return <ProductList apiUrl={`https://backend-kicap.onrender.com/api/products/sanpham/all`} />;
};
export default AllPage;
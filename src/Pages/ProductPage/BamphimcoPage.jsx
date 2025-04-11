import ProductList from "./ProductList";
const BPCPage = (props) => {
    return <ProductList apiUrl={`https://backend-kicap.onrender.com/api/products/banphimco`} />;
};
export default BPCPage;
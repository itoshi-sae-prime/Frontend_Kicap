import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: "cardSlice",
    initialState: {
        cart: [],
        total: 0,
    },
    reducers: {
        removeCard: (state, action) => {
            const Itemindex = state.cart.findIndex((item) => item.title === action.payload.title);
            const cleanPrice = parseFloat(
                action.payload.price.replace(/[^\d.]/g, "")
            ) || 0; //
            state.cart[Itemindex].quantity -= 1;
            state.total -= cleanPrice;
            if (state.cart[Itemindex].quantity === 0) {
                state.cart = state.cart.filter((item) => item.title !== action.payload.title);
            }
        },
        updateCard: (state, action) => {
            const Itemindex = state.cart.findIndex(
                (item) => item.title === action.payload.title
            );

            const cleanPrice = parseFloat(
                action.payload.price.replace(/[^\d.]/g, "")
            ) || 0;

            if (Itemindex >= 0) {
                // Nếu đã có → cộng thêm số lượng
                state.cart[Itemindex].quantity += action.payload.quantity;
                state.total += cleanPrice * action.payload.quantity;
            } else {
                // Nếu chưa có → thêm mới
                const temp = { ...action.payload, quantity: action.payload.quantity };
                state.cart = [...state.cart, temp];
                state.total += cleanPrice * action.payload.quantity;
            }

        },
        addCard: (state, action) => {
            const Itemindex = state.cart.findIndex((item) => item.title === action.payload.title);
            const quantityToAdd = action.payload.quantity || 1;
            const cleanPrice = parseFloat(
                action.payload.price.replace(/[^\d.]/g, "")
            ) || 0; //
            if (Itemindex >= 0) {
                state.cart[Itemindex].quantity += 1;
                state.total += cleanPrice;
                // console.log(state.cart[Itemindex].quantity * state.cart[Itemindex].price);
            } else {
                const temp = { ...action.payload, quantity: 1 };
                state.cart = [...state.cart, temp];
                state.total += cleanPrice;
            }
        },
    },
});
export const { addCard, removeCard, updateCard } = cardSlice.actions;
export default cardSlice.reducer;
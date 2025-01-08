import axios from "axios"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import {productsLocal} from "./../localProducts"
// add to cart
export const addItemsToCart = (id, quantity = 1) => async (dispatch, getState) => {
    const data = productsLocal.find((item) => item._id === id);
    // Check if product is found
    if (data) {
        console.log("Product found:", data);
    } else {
        console.log("Product not found");
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.name,
            // seller: data.product.brand.name,
            price: data.price,
            // cuttedPrice: data.product.cuttedPrice,
            image: data.images[0].url,
            stock: data.stock,
            // quantity,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// remove cart item
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// empty cart
export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}
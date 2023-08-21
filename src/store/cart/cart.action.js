import {CART_ACTION_TYPES} from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (bool)=>{
    return createAction(CART_ACTION_TYPES.SET_CART_OPEN,bool);
}

const addCartItem = (cartItems,productToAdd)=>{
    const existingCardItem = cartItems.find(
        (carditem)=> carditem.id == productToAdd.id
    );

    if(existingCardItem){
        return cartItems.map((carditem)=>
            carditem.id == productToAdd.id
                ? {...carditem,quantity: carditem.quantity+1}
                : carditem
        )
    }

    return [...cartItems,{...productToAdd,quantity:1}]
}

const removeCartItem = (cartItems,productToRemove)=>{
    const existingCartItem = cartItems.find((carditem)=> carditem.id==productToRemove.id)

    if(existingCartItem.quantity==1){
        return cartItems.filter((carditem)=> carditem.id!=productToRemove.id);
    }

    return cartItems.map((cartitem)=>
        cartitem.id == productToRemove.id 
            ? {...cartitem,quantity:cartitem.quantity - 1}
            : cartitem
        )
    }

    const clearCartItem = (cartItems,productToClear)=> cartItems.filter((carditem)=> carditem.id!=productToClear.id);


export const addItemToCart = (cartItems,productToAdd) =>{
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const removeItemToCart = (cartItems,productToRemove) =>{
    const newCartItems = removeCartItem(cartItems,productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const clearItemToCart = (cartItems,productToClear) =>{
    const newCartItems = clearCartItem(cartItems,productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
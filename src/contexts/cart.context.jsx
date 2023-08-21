// import { createContext, useReducer} from "react";

// export const CartContext = createContext({
//     isCartOpen : false,
//     setIsCartOpen : ()=>{},
//     cartItems : [],
//     addItemToCart : ()=>{},
//     cartCount : 0,
//     removeItemToCart : ()=>{},
//     clearItemToCart : ()=>{},
//     totalPrice : 0

// });




// export const CartProvider = ({children})=>{
//     const [{cartItems,isCartOpen,cartCount,totalPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

//     const updateCartItemsReducer = (newCratItems)=>{
//         const newCartCount = cartItems.reduce((total,cartitem)=>total + cartitem.quantity,0)

//         const newTotalPrice = cartItems.reduce((total,cartitem)=>total + (cartitem.quantity * cartitem.price),0)
        
//         dispatch({
//             type: CART_ACTION_TYPES.SET_CART_ITEMS,
//             payload : {
//                 cartItems : newCratItems,
//                 cartCount : newCartCount,
//                 totalPrice : newTotalPrice,
//             }
//         })
//     }




//     const value = {isCartOpen,setIsCartOpen,totalPrice,cartItems,clearItemToCart,removeItemToCart,addItemToCart,cartCount};
//     return (
//         <CartContext.Provider value={value}>{children}</CartContext.Provider>
//     )
// }

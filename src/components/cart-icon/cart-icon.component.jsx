import {useContext } from "react";
import {CartContext} from '../../contexts/cart.context';

import {ShopingIcon,CartIconContainer,ItemCount} from "./cart-icon.styles.jsx";

const CartIcon = ()=>{
    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);

    const toggleIsCartOpen = ()=> setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
           <ShopingIcon />
           <ItemCount>{cartCount}</ItemCount> 
        </CartIconContainer>   
    )
}

export default CartIcon;
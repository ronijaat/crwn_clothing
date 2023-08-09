import { useContext } from "react";
import {useNavigate} from "react-router-dom";

import Button from "../button/button.component";

import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

import { CartDropDownContainer ,EmptyMessage ,CartItems} from "./cart-dropdown.styles";


const CartDropdown = ()=>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutHandler = ()=>{
        navigate('/checkout');
    }

    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((item)=>(
                            <CartItem key={item.id} item={item}/>))
                    ) : (
                        <EmptyMessage>Your Cart is Empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckOutHandler}>CHECKOUT</Button>
        </CartDropDownContainer>
    )
}

export default CartDropdown;

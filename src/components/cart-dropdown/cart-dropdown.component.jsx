import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import {useNavigate} from "react-router-dom";

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../store/cart/cart.selector";

import { CartDropDownContainer ,EmptyMessage ,CartItems} from "./cart-dropdown.styles";


const CartDropdown = ()=>{
    const cartItems = useSelector(selectCartItems);
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

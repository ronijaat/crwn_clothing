import { useContext } from 'react';

import {CartContext} from '../../contexts/cart.context';
import CheckOutItem from '../checkout-item/checkout-item.component';

import './checkout.styles.scss'

const Checkout = ()=>{
    const {cartItems,totalPrice} = useContext(CartContext);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartitem) => {
                return (
                    <CheckOutItem key={cartitem.id} cartitem={cartitem} />
                )
            })}
            <span className='total'>Total : ${totalPrice}</span>
        </div>
    )
}

export default Checkout;
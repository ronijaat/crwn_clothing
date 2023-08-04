import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckOutItem = ({cartitem})=>{
    const {name,imageUrl,price,quantity} = cartitem;
    const {clearItemToCart,addItemToCart,removeItemToCart} = useContext(CartContext);

    const clearItemHandler = ()=> clearItemToCart(cartitem);
    const addItemHandler = ()=> addItemToCart(cartitem);
    const removeItemHandler = ()=> removeItemToCart(cartitem);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
                </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>

        </div>
    )
}

export default CheckOutItem;
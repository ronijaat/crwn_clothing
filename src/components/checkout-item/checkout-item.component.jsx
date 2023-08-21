import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemToCart,addItemToCart,removeItemToCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss';

const CheckOutItem = ({cartitem})=>{
    const {name,imageUrl,price,quantity} = cartitem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = ()=> dispatch(clearItemToCart(cartItems,cartitem));
    const addItemHandler = ()=> dispatch(addItemToCart(cartItems,cartitem));
    const removeItemHandler = ()=> dispatch(removeItemToCart(cartItems,cartitem));
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
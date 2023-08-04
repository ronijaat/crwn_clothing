import { createContext, useState ,useEffect} from "react";

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


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : ()=>{},
    cartItems : [],
    addItemToCart : ()=>{},
    cartCount : 0,
    removeItemToCart : ()=>{},
    clearItemToCart : ()=>{},
    totalPrice : 0

});

export const CartProvider = ({children})=>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartitem)=>total + cartitem.quantity,0)
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(()=>{
        const newTotalPrice = cartItems.reduce((total,cartitem)=>total + (cartitem.quantity * cartitem.price),0)
        setTotalPrice(newTotalPrice);
    },[cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const removeItemToCart = (productToRemove) =>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    }
    const clearItemToCart = (productToClear) =>{
        setCartItems(clearCartItem(cartItems,productToClear));
    }


    const value = {isCartOpen,setIsCartOpen,totalPrice,cartItems,clearItemToCart,removeItemToCart,addItemToCart,cartCount};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

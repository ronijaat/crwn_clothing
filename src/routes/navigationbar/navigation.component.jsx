import { Fragment ,useContext} from "react";
import {Outlet,Link} from "react-router-dom";
import {SignOutUser} from "../../utils/firebase/firebase.utils" 

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import { UserContext } from "../../contexts/user.context";
import {CartContext} from '../../contexts/cart.context'

import {NavigationContainer,LogoContainer,NavLinksContainer,NavLinks} from "./navigation.styles.jsx"

const NavigationBar = ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo/>
            </LogoContainer>
            <NavLinksContainer>
                <NavLinks to="/shop">
                    Shop
                </NavLinks>
                {currentUser ? (
                    <NavLinks as='span' onClick={SignOutUser}>
                        Sign Out
                    </NavLinks>
                ) : (
                    <NavLinks to="/auth">
                        SIGN IN
                    </NavLinks>
                )
                }
                <CartIcon/>

            </NavLinksContainer>
            {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
}

export default NavigationBar;
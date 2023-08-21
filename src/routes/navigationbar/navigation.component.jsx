import { Fragment ,useContext} from "react";
import {Outlet} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import {selectCurrentUser} from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import {NavigationContainer,LogoContainer,NavLinksContainer,NavLinks} from "./navigation.styles.jsx"
import { signOutStart } from "../../store/user/user.action";

const NavigationBar = ()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const SignOutUser = ()=> dispatch(signOutStart());

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
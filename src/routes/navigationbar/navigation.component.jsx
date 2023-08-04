import { Fragment ,useContext} from "react";
import {Outlet,Link} from "react-router-dom";
import {SignOutUser} from "../../utils/firebase/firebase.utils" 

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import { UserContext } from "../../contexts/user.context";
import {CartContext} from '../../contexts/cart.context'

import "./navigation.styles.scss"

const NavigationBar = ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                {currentUser ? (
                    <span className="nav-link" onClick={SignOutUser}>
                        Sign Out
                    </span>
                ) : (
                    <Link className="nav-link" to="/auth">
                        SIGN IN
                    </Link>
                )
                }
                <CartIcon/>

            </div>
            {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    )
}

export default NavigationBar;
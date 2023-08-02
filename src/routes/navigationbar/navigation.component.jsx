import { Fragment ,useContext} from "react";
import {Outlet,Link} from "react-router-dom";
import {SignOutUser} from "../../utils/firebase/firebase.utils" 

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import { UserContext } from "../../contexts/user.context";
import "./navigation.styles.scss"

const NavigationBar = ()=>{
    const {currentUser} = useContext(UserContext);

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
            </div>
        </div>
        <Outlet/>
      </Fragment>
    )
}

export default NavigationBar;
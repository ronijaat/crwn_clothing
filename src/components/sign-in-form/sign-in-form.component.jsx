import { useState } from "react";
import { useDispatch } from "react-redux";

import {SignInAuthUserWithEmailAndPassword,} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import { googleSignInStart ,emailSignInStart} from "../../store/user/user.action";
import './sign-in.styles.scss'

const defaultFormField = {
    email:'',
    password:'',
}

const SignUpForm = ()=>{

    const [formFields, setformFields] = useState(defaultFormField);
    const {email,password} = formFields;
    const dispatch = useDispatch();

    const SignInWithGoogle = async()=>{
        dispatch(googleSignInStart());
    }

    const resetFormField = ()=>{
        setformFields(defaultFormField);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email,password));
            resetFormField();
        }catch(err){
            switch(err.code){
                case "auth/wrong-password":
                    alert('Wrong password');
                    break;
                case "auth/user-not-found":
                    alert("Wrong Email");
                    break;
                default:
                    console.log('error in signing user',err);
            }
        }
    }

    
    const handleChange = (event)=>{
        //console.log(event.target);
        const {name, value} = event.target;
        setformFields({...formFields,[name]:value});
    }
    return (

    <div className="sign-up-container">
        <h2>Already have a account?</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput 
                label="Email"
                type="email" 
                required
                onChange={handleChange} 
                name="email" 
                value={email}
            />

            <FormInput 
                label="Password"
                type="password" 
                required
                onChange={handleChange} 
                name="password" 
                value={password}
            />

            <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>Google Sign In</Button>
            </div>
        </form>
    </div>
    )
}

export default SignUpForm;
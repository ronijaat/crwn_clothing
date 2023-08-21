import { useState} from "react";
import { useDispatch } from "react-redux";

import { SignUpStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up.styles.scss'

const defaultFormField = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:"",
}

const SignUpForm = ()=>{

    const [formFields, setformFields] = useState(defaultFormField);
    const {displayName,email,password,confirmPassword} = formFields;
    const dispatch = useDispatch();

    console.log(formFields);

    const resetFormField = ()=>{
        setformFields(defaultFormField);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if(password != confirmPassword){
            alert('password do not match!!!');
            return;
        }
        try{
            dispatch(SignUpStart(email,password,displayName));
            resetFormField();
        }catch(err){
            if(err.code=="auth/email-already-in-use"){
                alert("Email already use!!!");
            }
            else{
            console.log('error in creating user',err);
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
        <h2>Don't have a account?</h2>
        <span>Sign Up with your email and password</span>
        <form onSubmit={handleSubmit}>

            <FormInput 
                label="Display Name"
                type="text" 
                required
                onChange={handleChange} 
                name="displayName" 
                value={displayName}
            />
            
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

            <FormInput 
                label="Confirm Password"
                type="password" 
                required
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
            />

            <Button type='submit'>Sign In</Button>
        </form>
    </div>
    )
}

export default SignUpForm;
import {takeLatest , put, all, call, take} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signOutFailed,signOutStart,signOutSuccess,signInSuccess , signInFailed,signUpFailed,SignUpSuccess,SignUpStart} from './user.action';

import { SignOutUser,createAuthUserWithEmailAndPassword,getCurrentUser,SignInAuthUserWithEmailAndPassword , createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetail){
    try{
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth,additionalDetail);
        // console.log('us',userSnapShot);
        // console.log('userrrrrr',userSnapShot.data());
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth,user);
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* SignInWithEmailAndPassword({payload : {email,password}}){
    try{
        const {user} = yield call(SignInAuthUserWithEmailAndPassword,email,password);
        yield call(getSnapshotFromUserAuth,user);
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* signInAfterSignUp({payload:{user,displayName}}){
    try{
        yield call(getSnapshotFromUserAuth,user,displayName);
    }catch(error){
        yield put(signUpFailed(error));
    }
}   

export function* signUp({payload : {email,password,displayName}}){
    try{
        const {user} = yield createAuthUserWithEmailAndPassword(email,password);
        yield put(SignUpSuccess(user,{displayName}));
    }catch(error){
        yield put(signUpFailed(error));
    }
}

export function* SignOut(){
    try{
        yield SignOutUser();
        yield put(signOutSuccess());
    }catch(error){
        put(signInFailed(error));
    }
}


export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,SignInWithEmailAndPassword)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,signInAfterSignUp);
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START,signUp);
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,SignOut);
}

export function* userSagas(){
    yield all([call(onCheckUserSession),call(onGoogleSignInStart),call(onEmailSignInStart),call(onSignUpStart),call(onSignUpSuccess),call(onSignOutStart)]);
}
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFailed } from './user.action';
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopUp, signInWithEmail } from '../../utils/firebase/firebase.util';
// SET_CURRENT_USER: 'SET_CURRENT_USER',
// CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
// GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
// EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
// SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
// SIGN_IN_FAILED: 'user/SIGN_IN_FAILED'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        // console.log('In the geenratro', userSnapshot);
        yield put(signInSuccess({ id:userSnapshot.id, ...userSnapshot.data() }));
    } catch(error) {
        yield put(signInFailed(error));
    }
}


export function* signInWithGoogle() {
    try {
        const {user} =  yield call(signInWithGooglePopUp);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmailandPasword({payload:{email, password}}) {
    
    try {
        const {user} =  yield call(signInWithEmail, email, password);
        yield call(getSnapshotFromUserAuth, user);

        console.log(user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {

    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
        
    } catch(error) {
        yield put(signInFailed(error));
    }

}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* googleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailandPasword);
}

export function* userSagas() {
    yield all([ 
        call(onCheckUserSession),
         call(googleSignIn),
        call(onEmailSignInStart) 
    ]);
}

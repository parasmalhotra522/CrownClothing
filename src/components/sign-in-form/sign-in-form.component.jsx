import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInAuthUserDetails
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../store/Loader/loader';
import { setCurrentUser } from '../../store/user/user.reducer';

const defaultFormFields = {
  email: '',
  password: '',
};



const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(startLoading());
    try {
      const {user} = await signInWithGooglePopup();
      // console.log("-00Checkin sign in with Google Ppop UP", user);
      
       await localStorage.setItem('authData', JSON.stringify({
        idToken: user.accessToken,
        refreshToken: user.stsTokenManager.refreshToken,
        email: user.email,
        expiresIn: user.stsTokenManager.expirationTime,
         isExpired: user.stsTokenManager.isExpired,
        displayName:user.displayName
      }))
      
      
      dispatch(stopLoading());
      notify('success', `Welcome ${user.displayName}`);
      navigate('/shop')
     
    } catch (error) {
      dispatch(stopLoading());
      notify('error', 'errr');
      resetFormFields();
    }
  };

  const notify = (type, message) => {
    switch (type) {
      case 'warn':
        toast.warn(message)
        break;
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        break;
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(startLoading());
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      // set the token and everything in the local storage
      
      const {displayName} = await signInAuthUserDetails(user);
    
    
      await localStorage.setItem('authData', JSON.stringify({
        idToken: user.accessToken,
        refreshToken: user.stsTokenManager.refreshToken,
        email: user.email,
        expiresIn: user.stsTokenManager.expirationTime,
        isExpired: user.stsTokenManager.isExpired,
        displayName: displayName
      }))
      


      // console.log("--- Checking response aftre getting user", user);
      // console.log("----Checking local", localStorage.getItem('authuser'))
      resetFormFields();
      dispatch(stopLoading());
      dispatch(setCurrentUser(user));
      notify('success', `Welcome ${displayName ?? user.email}`);
      navigate('/shop')
    } catch ({code, message}) {
      // console.log('user sign in failed', code, message);
      dispatch(stopLoading());
      notify('error', code + message);
      resetFormFields();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

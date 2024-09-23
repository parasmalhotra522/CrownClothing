import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { AuthenticationContainer } from './authentication.styles';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../store/Loader/loader';

const Authentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("----IN the user");
        dispatch(startLoading());
        navigate('/shop');
        dispatch(stopLoading());
        // toast.warn("User is already signed in");
      } else {
        dispatch(stopLoading());
        // User is not signed in, stay on authentication page
        // console.log("User is not logged in");
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [navigate, dispatch]);

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

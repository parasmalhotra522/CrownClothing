import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.reducer';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import { ClipLoader } from 'react-spinners';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentSuccess from './components/PaymentSuccess';
const App = () => {
  const dispatch = useDispatch();
  const darkModeState = useSelector(state => state.darkModeReducer);
  const loading = useSelector(state => state.loaderReducer.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
      createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user ? { ...user, displayName: JSON.parse(localStorage.getItem('authData')).displayName } : null));

    });
    
    return unsubscribe;
  }, [dispatch]);

  const blurStyle = {
    filter: loading ? 'blur(1.5px)' : 'none',
    transition: 'filter 0.3s ease',
  };
  return (
    <div style={{ 
      backgroundColor: darkModeState.backgroundColor,
      color: darkModeState.textColor,
      minWidth: '100vw',
      minHeight: '100vh',
      position: 'relative' // Ensure positioning context for the loader
    }}>
      {loading && (
        <div className="loader-container"
        style={{
           position:'fixed', /* Fixed positioning to center in the viewport */
          top:'50%',
          left:'50%',
          transform: 'translate(-50%, -50%)', /* Center it vertically and horizontally */
          zIndex:'1000', /* Ensure it's above other content */
        }}
        
        >
          <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div style={blurStyle}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path='/success' element={<PaymentSuccess/>}/>
        </Route>
      </Routes>
      </div>
    </div>
  );
};

export default App;

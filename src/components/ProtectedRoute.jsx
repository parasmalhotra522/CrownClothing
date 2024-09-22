import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startLoading, stopLoading } from "../store/Loader/loader"
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser) {
      dispatch(startLoading()); // Start loading when navigating away
      // Simulate a delay for loading (optional)
      setTimeout(() => {
        dispatch(stopLoading()); // Stop loading after a delay (if needed)
      }, 1000);
    }
  }, [currentUser, dispatch]);

  return currentUser ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

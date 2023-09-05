import { Routes, Route, Outlet } from 'react-router-dom';
import { useEffect } from "react"
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.util';
import { useDispatch } from 'react-redux';
import setCurrentUser from './store/user/user.action';
import setCategoriesMap from './store/categories/categories.action';

import {getCategoriesAndDocuments} from './utils/firebase/firebase.util';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUpForm from './components/sign-up/sign-up.component';
import Shop from './routes/shop/shop.component';
import CheckOutPage from './components/check-out/check-out.component';

// wild card character in React will be using * for 404 pages
const ErrorPage = () => {
  return (<h1> Page not found</h1>);
}



const App = () => {

  // now we are going to make route to the Home component that will be the base page of the Website
  // Routes will contain multiple singular routes and we have concept of path and element in React
  // where path -> includes the url string path  
  // element -> the component it should take your component to ..
  // when the path matches

  const dispatch = useDispatch()
  useEffect(()=>{
    
    const unsubscribe =  onAuthStateChangedListener(
    (user) => {
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
         // console.log(user);
        return unsubscribe;
        });  

},[]);



  // the api call to get the data from the firestore and we have set the data to the entire state
    useEffect(()=>{
      const getCategoriesMap = async() => {
          const categoryMap = await getCategoriesAndDocuments();
          // console.log('cccc', categoryMap);
          // this is the action method in the categories.action.js
          // console.log('i am in app.js',categoryMap);
          dispatch(setCategoriesMap(categoryMap));
         
      }
      getCategoriesMap();
    },[]);




  return (
    <Routes>
      {/* these below are the sibling routes 
      <Route path='/' element={<Home />}></Route>
      <Route path='/nav' element={<NavBar />}></Route> */}
     
     {/* We are making nested route here /home/nav to show the bottom nav 
      but we see that the home component is still visisble despite going to /home/nav url
      to get rid of this we have to Add <Outlet> to the Parent component which is Home in this case
       to tell that wehere it should go
      *** So NavBar should normally stay same a top in each route so we can make it as Parent component
      and nest all the routes inside it ****

     
     
       similar to router-outlet in angular
     */}




     <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop/*' element={<Shop />}></Route>
        <Route path='/sign-up' element={<SignUpForm/>}></Route>

        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path="/checkout" element={<CheckOutPage/>}></Route>
     </Route>

      <Route path='*' element={<ErrorPage />}></Route>
    
    </Routes>
  );
}

export default App;

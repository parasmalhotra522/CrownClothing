import {useState } from "react";
import "./sign-in.component.scss";
import { auth, signInWithGooglePopUp, createUserDocumentFromAuth,
     signInWithEmail } from "../../utils/firebase/firebase.util";
import SignUpForm from "../sign-up/sign-up.component";
import "../sign-up/form-input.styles.scss";

const SignIn = () => {

    // useEffect( () => {     
    //     const res = getRedirectResult(auth);

    //     if(res) {
    //         console.log( "In redirect com", res);
    //         // let {user} = Promise.resolve(res);
    //         console.log("checking resolve ",  Promise.resolve(res));
    //         // const userDocRef =  createUserDocumentFromAuth(user);
    //     }


    //     // return  await createUserDocumentFromAuth(res.users);
    //     // console.log(user);

    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp(); // extracting only the user object from the api call 

        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(user);


    }

  
    // const logRedirect = async() => {
    //     // if we do just like this we won't be able to retain the data from the user...
    //     // becoz the auth will take us to a new page and when it mounts again we re run the page 
    //     // and loose all the data 
    //     // to store the state we can use Hook useEffect()
    //     console.log("With redirect", signInWithGoogleRedirect());


    // }
    const defaultValues = {
        email: '',
        password: ''
    };
    const [formState, setFormState] = useState(defaultValues);
    const { email, password } = formState;

    const resetForm = () => {
        setFormState(defaultValues);
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({...formState, [name]:value});
        // console.log("Email value", email);
        // console.log("Password val", password);
    }

    // using useContext to fetch the setter method of the context of the user
    // const { setCurrentUser } = useContext(UserContext); // just fetching the setContextUser from UserContext

    const handleSubmitForm = async(event) => {
        // console.log("inside handle ")
        event.preventDefault();
        console.log(event);
        if(!email && !password) {
            console.log("here");
            return;
        }
        try {
            // console.log("user entred", email, password);
           const res =  await signInWithEmail(email, password);
           // we need to extract the user object and set it to userContext
           const { user } = res;

           // setting up the user state so since there is change in the state it will re-render the functional component
            // setCurrentUser(user); // run useContext whenever there is change in the value of the user object

           console.log("Check if successfully logged in?", res);
           resetForm();
        } catch(error) {
            console.log(error);
            alert(error.code);
            }
        
    }

    return (
        <div className="container">
            {/* sign-in-form taking 50% of width on the left */}
            <div className="sign-in-container">
                <h2>I already have an account</h2>
                <h3>Sign in with your email and password</h3>
                <form onSubmit={handleSubmitForm}>
                    <div className="group">
                        <input type="email" className="form-input" name="email" value={email} onChange={handleChange} required />
                        <label className={`${email.length ? 'shrink' : ''} form-input-label`}>Email</label>
                    </div>

                    <div className="group">
                        <input type="password" className="form-input" name="password" value={password} onChange={handleChange} required />
                        <label className={`${password.length ? 'shrink' : ''} form-input-label`}>Password</label>
                    </div>
                    <div className="button-container">
                <button className="sign-in-btn submit-btn"
                > Sign In</button>
                  <button className="submit-btn google-sign-in"
                    onClick={logGoogleUser}
                > Google Sign In  </button>
                </div>
                </form>

          
           
            </div>
            {/* // sign-up-form taking 50%of width on the right */}

            <div className="sign-up-container">
                <SignUpForm></SignUpForm>
            </div>

        </div>

        


    );
}

export default SignIn;
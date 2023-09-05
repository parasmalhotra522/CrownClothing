
import { Fragment, useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import "./form-input.styles.scss";


const SignUpForm = () => {

    const defaultFormFields = {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    // setting the state to the initial values
    const [formState, setFormState] = useState(defaultFormFields);

    // console.log("checking form state", formState);
    // we need to update the state with the change in value in any of the fields below 
    // 1) Oneway is to make onchange event handler for each input field and update each individual state field
    // 2) is to make an object club them together and make a generic onchange func to handle change in any of the fields

    const { displayName, email, password, confirmPassword } = formState;

    // function to re-set the form value to default
    const resetForm = () => {
        setFormState(defaultFormFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(name, value);
        setFormState({ ...formState, [name]: value });

    }

    // const {setCurrentUser} = useContext(UserContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }
        console.log("checking event", event);

        try {
            const res = await createAuthUserWithEmailAndPassword(email, password);
            const { user } = res;
            createUserDocumentFromAuth(res.user, { displayName })
            
            // setCurrentUser(user); // setting the user context to the user object
            console.log(user);
            await resetForm();
        }
        catch (err) {
            console.log(err);
        }
        //    let res = await getRedirectResult(auth);
        //    console.log(res);

    }

    return (
        <Fragment>
            <h2>Don't have an Account?</h2>
            <form onSubmit={handleSubmit}>
                <div className="group">
                    <input type="text" className="form-input" name="displayName" value={displayName} onChange={handleChange} required />
                    <label className={`${displayName.length > 0 ? 'shrink' : ''} form-input-label`}>Display Name</label>
                </div>
                <div className="group">
                    <input type="email" className="form-input" name="email" value={email} onChange={handleChange} required />
                    <label className={`${email.length > 0 ? 'shrink' : ''} form-input-label`}>Email</label>
                </div>

                <div className="group">
                    <input type="password" className="form-input" name="password" value={password} onChange={handleChange} required />
                    <label className={`${password.length > 0 ? 'shrink' : ''} form-input-label`}>Password</label>
                </div>

                <div className="group">
                    <input type="password" className="form-input" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                    <label className={`${confirmPassword.length ? 'shrink' : ''} form-input-label`}>Confirm Password</label>
                </div>
                <button className="submit-btn inverted" >Sign Up</button>
            </form>
        </Fragment>
    );
}

export default SignUpForm;
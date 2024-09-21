import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { PaymentFormContainer, FormContainer } from './payment-form.styles';


export const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const stripeHandler = async(e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({amount:10000})

        }).then(res=>res.json());
        console.log(response);
        const {paymentIntent: {client_secret}} = response;
        console.log(client_secret);


        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Paras'

                }
            }
        });
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successfull');
            }
        }
    }

    return (
        <PaymentFormContainer onSubmit={stripeHandler}>
            <FormContainer>
                <h2>Credit Card Payment : </h2>
            <CardElement/>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
       
            </FormContainer>
        </PaymentFormContainer>
          
    );
} 
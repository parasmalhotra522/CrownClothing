import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
// import { PaymentFormContainer, FormContainer } from './payment-form.styles';


// // export const PaymentForm = () => {
// //     const stripe = useStripe();
// //     const elements = useElements();

// //     const stripeHandler = async(e) => {
// //         e.preventDefault();
// //         if (!stripe || !elements) {
// //             return;
// //         }
// //         const response = await fetch("/.netlify/functions/create-payment-intent", {
// //             method:'post',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body : JSON.stringify({amount:10000})

// //         }).then(res=>res.json());
// //         console.log(response);
// //         const {paymentIntent: {client_secret}} = response;
// //         console.log(client_secret);


// //         const paymentResult = await stripe.confirmCardPayment(client_secret, {
// //             payment_method: {
// //                 card: elements.getElement(CardElement),
// //                 billing_details: {
// //                     name: 'Paras'

// //                 }
// //             }
// //         });
// //         if (paymentResult.error) {
// //             alert(paymentResult.error);
// //         } else {
// //             if(paymentResult.paymentIntent.status === 'succeeded') {
// //                 alert('Payment Successfull');
// //             }
// //         }
// //     }

// //     return (
// //         <PaymentFormContainer onSubmit={stripeHandler}>
// //             <FormContainer>
// //                 <h2>Credit Card Payment : </h2>
// //             <CardElement/>
// //             <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
       
// //             </FormContainer>
// //         </PaymentFormContainer>
          
// //     );
// // } 


// import { useStripe, useElements } from "@stripe/react-stripe-js";
// import { CardElement } from "@stripe/react-stripe-js";
// import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
// import { PaymentFormContainer, FormContainer, CardSection } from './payment-form.styles';

// export const PaymentForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const stripeHandler = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) {
//             return;
//         }
//         const response = await fetch("/.netlify/functions/create-payment-intent", {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ amount: 10000 })
//         }).then(res => res.json());

//         const { paymentIntent: { client_secret } } = response;

//         const paymentResult = await stripe.confirmCardPayment(client_secret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name: 'Paras'
//                 }
//             }
//         });
//         if (paymentResult.error) {
//             alert(paymentResult.error.message);
//         } else {
//             if (paymentResult.paymentIntent.status === 'succeeded') {
//                 alert('Payment Successful');
//             }
//         }
//     }

//     return (
//         <PaymentFormContainer onSubmit={stripeHandler}>
//             <FormContainer>
//                 <h2>Credit Card Payment</h2>
//                 <CardSection>
//                     <CardElement options={{
//                         style: {
//                             base: {
//                                 color: '#333',
//                                 fontSize: '16px',
//                                 '::placeholder': {
//                                     color: '#aaa'
//                                 }
//                             },
//                             invalid: {
//                                 color: '#fa755a',
//                                 iconColor: '#fa755a'
//                             }
//                         }
//                     }} />
//                 </CardSection>
//                 <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
//             </FormContainer>
//         </PaymentFormContainer>
//     );
// }



// payment-form.component.js
import React, { useState } from 'react';
import Card from './payment-form.styles'; // Adjust the import based on your file structure
// import { CardElement } from '@stripe/react-stripe-js'; // Import CardElement for Stripe
// import Button from '../button/button.component';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const PaymentForm = ({amt}) => {

        const stripe = useStripe();
    const elements = useElements();
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardHolder, setCardHolder] = useState("John Doe");
  const [expiryDate, setExpiryDate] = useState("12/25");
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
            body : JSON.stringify({amount:amt})

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
    
    
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your payment processing logic here
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Credit Card Payment</h2>
      <Card 
        cardNumber={cardNumber} 
        cardHolder={cardHolder} 
        expiryDate={expiryDate} 
      />
      <Input 
        type="text" 
        placeholder="Card Number" 
        value={cardNumber} 
        onChange={handleCardNumberChange} 
      />
      <Input 
        type="text" 
        placeholder="Card Holder" 
        value={cardHolder} 
        onChange={handleCardHolderChange} 
      />
      <Input 
        type="text" 
        placeholder="Expiry Date (MM/YY)" 
        value={expiryDate} 
        onChange={handleExpiryDateChange} 
      />
      <CardElement />
      <Button type="submit"
        onClick={stripeHandler}
          >Pay Now</Button>
    </FormContainer>
  );
};

export default PaymentForm;





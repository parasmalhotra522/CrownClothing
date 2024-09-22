import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { emptyCart, setIsCartOpen } from '../../store/cart/cart.reducer';
import { useNavigate } from 'react-router-dom';
import { startLoading, stopLoading } from '../../store/Loader/loader';
import CrownLogo  from '../../assets/crown.svg';

const PaymentForm = ({ amt }) => {
    const priceForStripe = amt * 100;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isCartOpen = useSelector(selectIsCartOpen)
    const onToken = async (token) => {
        console.log('token', token);
        dispatch(setIsCartOpen(false))
        try {
            const resp = await axios.post('/.netlify/functions/create-payment-intent',
                {
                    amount: priceForStripe,
                }
            );

            console.log("Checking resopse", resp);
            const { paymentIntent } = resp.data;
            // Ensure paymentIntent exists
            if (!paymentIntent) {
                throw new Error("Payment Intent creation failed.");
            }
await dispatch(startLoading());
            const confirmResp = await axios.post('/.netlify/functions/confirm-payment', {
                paymentIntentId: paymentIntent.id,
                token: token.id, // Pass the token ID
            });

            console.log("Payment Confirmation Response:", confirmResp);
            toast.success('Payment Successful!');
            await dispatch(emptyCart());
            dispatch(setIsCartOpen(false))
            await dispatch(stopLoading());
            navigate('/success');
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
            // console.log('Payment Error: ', JSON.parse(error));
            // alert(
            //   'There was an issue with your payment! Please make sure you use the provided credit card.'
            // );
        }
    };

    return (
            <StripeCheckout
            label='Pay Now'
            name='Clothing Store'
            billingAddress
            shippingAddress
            image={CrownLogo}
            description={`Your total is $${amt}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            />
        
    );
};

export default PaymentForm;
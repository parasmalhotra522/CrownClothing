require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { paymentIntentId, token } = JSON.parse(event.body);
    console.log("-------CONFIRM", event.body);
    // Confirm the Payment Intent using the token
    const confirmation = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method_data: {
        type: 'card',
        card: {
          token, // Use the token here
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ confirmation }),
    };
  } catch (error) {
    console.log("Confirmation error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};


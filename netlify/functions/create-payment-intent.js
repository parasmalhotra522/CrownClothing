// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.handler = async(event) => {
//     try {
//         const { amount, token } = JSON.parse(event.body);
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency:"usd",
//             // payment_method:token,
//             confirmation_method:'automatic',
//             confirm:true,
//             payment_method_types: ["card"]
        
//         });
//         return {
//             statusCode : 200,
//             body: JSON.stringify({ paymentIntent })
//         }
//     } catch(error) {
//         console.log(error);
//         return  {
//             statusCode: 400,
//             body: JSON.stringify({ error:error.message })
//         }
//     }   

// }

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    
    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};




const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const MIN_AMOUNT_INR = 40 * 100; 

const processStripePayment = async (amount, currency, paymentMethodId) => {
  if (currency === 'INR' && amount < MIN_AMOUNT_INR) {
    throw new Error(`Amount must be at least ${MIN_AMOUNT_INR / 100} INR.`);
  }


  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return await stripe.paymentIntents.confirm(paymentIntent.id, {
    payment_method: paymentMethodId,
    return_url: '', 
  });
};

module.exports = processStripePayment;

const { Router } = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);

const paymenRoutes = Router();

// Stripe:
paymenRoutes.post('/premium', async (req, res) => {
    try {
        const { id, amount } = req.body;
        //const stripe = require('stripe')('sk_test_51LrrgZJF8OdpthZQmRCBHcWJZrbLDBgEcF7C5ksGVw7TkpiVNT1S8vZscsYD0magRQMrXuiTAWkcQRJ8aEn7Iil000AckGToF5');
        // const payment = await stripe.paymentIntents.create({
        //   amount,
        //   currency: 'usd',
        //   description: 'Kinema Premium Subscription',
        //   payment_method: id,
        //   confirm: true,
        // });
      
        const stripe = require('stripe')('sk_test_51LrrgZJF8OdpthZQmRCBHcWJZrbLDBgEcF7C5ksGVw7TkpiVNT1S8vZscsYD0magRQMrXuiTAWkcQRJ8aEn7Iil000AckGToF5');
  
        const subscription = await stripe.subscriptions.create({
            customer: 'cus_MdgL62Uawd9WIW',
            items: [
            {price: 'price_1LuOxpJF8OdpthZQ2wD8lX9b'},
            ],
        });
  
        res.send({ message: 'Your payment has been successfully processed. Enjoy Kinema Premium', success: true });
    } 
    catch (error) {
        res.json({ message: "We were not able to process your payment. Please try again", sucess: false });
    }
});
  
paymenRoutes.post('/rent', async (req, res) => {
    try {
        const { id, amount } = req.body;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            description: 'Kinema Rent',
            payment_method: id,
            confirm: true,
            customer: 'cus_MdgL62Uawd9WIW',
        });
        res.send({ message: 'Your payment has been successfully processed. Enjoy your movie!', success: true });
    } 
    catch (error) {
        res.json({ message: "We were not able to process your payment. Please try again", sucess: false });
    }
});


module.exports = paymenRoutes;




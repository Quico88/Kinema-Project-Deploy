const { Router } = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);

const paymenRoutes = Router();

// Stripe:
paymenRoutes.post('/premium', async (req, res) => {
    const stripe = require('stripe')('sk_test_51LrrgZJF8OdpthZQmRCBHcWJZrbLDBgEcF7C5ksGVw7TkpiVNT1S8vZscsYD0magRQMrXuiTAWkcQRJ8aEn7Iil000AckGToF5');
    try {   
        const { id, username, email } = req.body;
        let clientId = '';

        const newCustomer = await stripe.customers.create({
            name: username,
            email: email,
            payment_method: id,
            invoice_settings: { default_payment_method: id }
        });

        clientId = newCustomer.id;
        
        const subscription = await stripe.subscriptions.create({
            currency: 'usd',
            description: 'Kinema Premium',
            customer: clientId,
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
        const { id, username, email  } = req.body;
        let clientId = '';

        const existingCustomer = await stripe.customers.list({
            email: email,
            limit: 1
        });

        if (existingCustomer.data.length){
            clientId = existingCustomer.data[0].id;
        }
        else {
            const newCustomer = await stripe.customers.create({
                name: username,
                email: email,
            });
            clientId = newCustomer.id
        }

        const payment = await stripe.paymentIntents.create({
            amount: '199',
            currency: 'usd',
            description: 'Kinema Rent',
            payment_method: id,
            confirm: true,
            customer: clientId,
        });

        res.send({ message: 'Your payment has been successfully processed. Enjoy your movie!', success: true });
    } 
    catch (error) {
        res.json({ message: "We were not able to process your payment. Please try again", sucess: false });
    }
});


module.exports = paymenRoutes;




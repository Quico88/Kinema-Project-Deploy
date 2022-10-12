import React from "react";
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"

import "bootswatch/dist/lux/bootstrap.min.css"

const stripePromise = loadStripe("pk_test_51LrrgZJF8OdpthZQzjEA3gwPESBIW22v5gNBch6JZhhDgIhm0j25PoUQ0XzT0HQqUb1EwnzdO68oWfJK5pgrvVYl00TLD4bPSL")



const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
      
    const handleSubmit = async (e) => {
        e.preventDefault()
   
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
        })
    if(!error){
        
        const {id} = paymentMethod
        const {data} = await axios.post("http://localhost:3001/payment/rent",{id,
    amount: 500
    })
    console.log(data)
    }
    
    }

    return (
        <form onSubmit={handleSubmit} className="card card-body">
            <h1>Price : 5 U$D</h1>

            <div className="form-group">
            <CardElement className="form-control"/>
            </div>
            <button className="btn btn-succes">BUY</button>

        </form>
    )

}

export default function PaymentCheckoutRent() {
    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4">
                <div className="row">
                    <div className=".col-md.offset-md-4">
                        <CheckoutForm />
                    </div>
                </div>

            </div>
        </Elements>

    )
}
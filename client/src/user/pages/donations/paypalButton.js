import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = (props) => {
    const {donation} = props;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (id) => {
        // Call backend function to fulfill order

        // if response is success
        setPaidFor(true);
        // Refresh user's account or subscription status

        // if response is error
        // setError("Your payment was processed successfully. 
        //        However, we are unable to fulfill your purchase. 
        //        Please contact us at support@designcode.io for assistance.");
    };

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        alert("Thank you for your donation!");
    }
    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }

    return (
        <PayPalButtons 
            createOrder={(data, actions) => {
                return actions.order.create({
                purchase_units: [
                    {
                    description: donation.description,
                    amount: {
                        value: donation.price
                    }
                    }
                ]
                });
            }}
            onApprove={async (data, actions) => {
                const donation = await actions.donation.capture(); 
                console.log("donation", donation);
                handleApprove(data.id);
            }}
            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to cart
            }}
            onError={(err) => {
                setError(err);
                console.error("PayPal Checkout onError", err);
            }}     
        />
    );
};

export default PayPalButton;
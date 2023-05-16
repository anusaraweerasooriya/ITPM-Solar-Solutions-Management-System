import React, { useState } from 'react'
import PayPalButton from './paypalButton'
import { Box, Typography } from '@mui/material';
import FlexBox from 'admin/components/FlexBox';
import CardPayment from './cardPayment';

const PaymentOptions = ({amount, userId}) => {
   const [isCardPayment, setCardPayment] = useState(false);
   console.log("user", userId)

    const donation = {
        description: "description",
        price: `$ ${amount}`,
    };

    return (
        <Box>
            <Typography textAlign="center" fontWeight="bold" fontSize="1.5rem">
                Amount : {donation.price}
            </Typography>

            <FlexBox padding="2rem" gap="2rem">
                <Box onClick={() => {setCardPayment(true)}}>
                    <img 
                        width="130px"
                        alt="visa"
                        src={`http://localhost:5001/assets/visa.png`}
                    />
                </Box>
                <Box onClick={() => {setCardPayment(true)}}>
                    <img 
                        width="100px"
                        alt="master"
                        src={`http://localhost:5001/assets/master.png`}
                    />
                </Box>
                <PayPalButton donation={donation} />
            </FlexBox>

            {isCardPayment && (
                <CardPayment amount={amount } userId={userId} />
            )}
        </Box>
    )
}

export default PaymentOptions

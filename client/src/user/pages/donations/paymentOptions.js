import React, { useState } from 'react'
import PayPalButton from './paypalButton'
import { Box, Typography } from '@mui/material';
import FlexBox from 'admin/components/FlexBox';
import CardPayment from './cardPayment';

const PaymentOptions = () => {
   const [isCardPayment, setCardPayment] = useState(false);

    const donation = {
        description: "description",
        price: "LKR 20",
    };

    return (
        <Box>
            <Typography textAlign="center" fontWeight="bold" fontSize="1.5rem">
                Amount : {donation.price}
            </Typography>
            <FlexBox padding="2rem" gap="2rem">
                <Box onClick={() => {setCardPayment(true)}}>
                    <img src="../../assets/visa.png" alt="visa" />
                    <img src="../../assets/master.png" alt="master" />
                </Box>
                <PayPalButton donation={donation} />
            </FlexBox>

            {isCardPayment && (
                <CardPayment />
            )}
        </Box>
    )
}

export default PaymentOptions

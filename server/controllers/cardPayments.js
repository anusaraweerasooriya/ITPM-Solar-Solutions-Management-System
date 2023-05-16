import CardPayment from "../models/CardPayment.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";

/* CREATE PAYMENT */
export const createPayment = async (req, res) => {
    try {
        const {
            user,
            cardNumber,
            cardName,
            amount,
            expDate,
            cvv,
            type,
        } = req.body;

        const newCardPayment = new CardPayment({
            user,
            cardNumber,
            cardName,
            amount,
            expDate,
            cvv,
            type,
        });
        const savedPayment = await newCardPayment.save();
        res.status(201).json(savedPayment);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};
import ProductRequest from "../models/ProductRequest";


export const createProductRequest = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            relatedProduct,
            date,
            message
        } = req.body;

        const createRequest = new ProductRequest({
            fullName,
            email,
            phone,
            relatedProduct,
            date,
            message
        });
        const savedRequest = await createRequest.save();
        res.status(201).json(savedRequest);
    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};
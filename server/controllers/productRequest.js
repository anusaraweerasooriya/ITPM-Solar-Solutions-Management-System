import { HttpError } from "../models/HttpError.js";
import ProductRequest from "../models/ProductRequest.js";


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

/* Admin Read */
export const getAdminProductRequest = async (req, res) => {
    try {
        const { page=1, pageSize=20, sort=null, search="" } = req.query;

        //format sort
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}

        const productRequest = await productRequest.find({
            $or: [
                { fullName: { $regex: new RegExp(search, "i") } },
                { email: { $regex: new RegExp(search, "i") } },
                { relatedProduct: { $regex: new RegExp(search, "i") } },
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await ProductRequest.countDocuments({
            fullName: { $regex: search, $options: "i" }
        });

        res.status(200).json({
            productRequest,
            total
        });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

export const getProductRequestById = async (req, res, next) => {
    try {
        const { productReqId } = req.query;

        const productRequest = await ProductRequest.findById(productReqId);
        res.status(200).json(productReqId);
    } catch (err) {
        const error = new HttpError("Failed fetch data! Please try again", 500);
        return next(error);
    }
};


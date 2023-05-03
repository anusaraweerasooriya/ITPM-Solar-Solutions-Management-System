import Product from "../models/Product.js";

/* CREATE INVERTER PRODUCT */
export const createProduct = async (req, res) => {
    try {
        const {
            productName,
            price,
            productType,
            imagePath,
            description,
            category,
            ratedPower,
            batteryVoltage,
            MPPTVoltage,
            maxVoltage,
            maxCurrent,
        } = req.body;


        let features = [];
        features.push({ratedPower});
        features.push({batteryVoltage});
        features.push({MPPTVoltage});
        features.push({maxVoltage});
        features.push({maxCurrent});

        const newProduct = new Product({
            productName, 
            price, 
            productType, 
            imagePath, 
            description,
            category, 
            features:features
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/*CREATE SOLAR PANEL */
/*export const createSolarPanel = async (req, res) => {
    try {
        const {
            productName,
            price,
            productType,
            imagePath,
            description,
            category,
            maxVoltage,
            maxCurrent,
            ratedPower,
        } = req.body;

        let features = [];
        features.push({maxVoltage});
        features.push({maxCurrent});
        features.push({ratedPower});

        const newProduct = new Product({
            productName, 
            price, 
            productType, 
            imagePath, 
            description,
            category, 
            features:features
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};*/

/* ADMIN DISPLAY */
export const getAdminProducts = async (req, res) => {
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
        const sortFormatted =  Boolean(sort) ? generateSort() : {}

        const products = await Product.find({
            $or: [
                { productName: { $regex: new RegExp(search, "i") } },
                { price: { $regex: new RegExp(search, "i") } },
                { productType: { $regex: new RegExp(search, "i") } },
                { category: { $regex: new RegExp(search, "i") } },  
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Product.countDocuments({
            productName: { $regex: search, $options: "i" }
        });
        
        res.status(200).json({
            products,
            total,
        });
    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/* CLIENT DISPLAY */
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/*UPDATES */
export const updateProduct = async (req, res) => {
    const errors = validationResult(res);
    if(!errors.isEmpty()) {
        return next(
            new HttpError("Invaild inputs passed, please check your data", 403)
        );

      /*  console.log(req.body);

        let product;
        try {
            const {
                
            }
        }catch (err) {
            
        }*/
    }
};
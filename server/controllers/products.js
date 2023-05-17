import { HttpError } from "../models/HttpError.js";
import Product from "../models/Product.js";
import { validationResult } from "express-validator";

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
            normalVoltage, 
            normalCapacity, 
            energy, 
        } = req.body;


        let features = [];
        features.push({ratedPower});
        features.push({batteryVoltage});
        features.push({MPPTVoltage});
        features.push({maxVoltage});
        features.push({maxCurrent});
        features.push({normalVoltage});
        features.push({normalCapacity});
        features.push({energy});

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
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};


/*UPDATE */
/*export const updateProduct = async (req, res, next) => {
    const errors = validationResult(res);
    if(!errors.isEmpty()) {
        return next(
            new HttpError("Invaild inputs passed, please check your data", 403)
        );
    }

    console.log(req.body);
    
    let product;
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
            normalVoltage, 
            normalCapacity, 
            energy, 
        } = req.body;

        const productId = req.params.prid;
        product = await Product.findById(productId);

        product.productName = productName;
        product.price = price;
        product.productType = productType;
        product.imagePath = imagePath;
        product.description = description;
        product.category = category;
        product.ratedPower = ratedPower;
        product.batteryVoltage = batteryVoltage;
        product.MPPTVoltage = MPPTVoltage;
        product.maxVoltage = maxVoltage;
        product.maxCurrent = maxCurrent;
        product.normalVoltage = normalVoltage;
        product.normalCapacity = normalCapacity;
        product.energy = energy;

    } catch (err) {
        const error = new HttpError("Something went wrong. Please try again.", 422);
        return next(error);
    }

    try {
        await product.save();
    }   catch (err) {
        const error = new HttpError(
            "Something went wrong. Please try again.",
            500
        );
        return next(error);
    }
    
    res.status(200).json({ product });
};*/

export const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

 

  console.log(req.body);

 

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
    normalVoltage,
    normalCapacity,
    energy,
  } = req.body;

 

  const productId = req.params.prid;

 

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
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
        normalVoltage,
        normalCapacity,
        energy,
      },
      { new: true }
    );

 

    if (!updatedProduct) {
      throw new Error(`Product with ID ${productId} not found`);
    }

 

    res.status(200).json({ product: updatedProduct });
  } catch (err) {
    const error = new HttpError(err.message || "Something went wrong. Please try again.", 422);
    return next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { prodId } = req.query;

    const product = await Product.findById(prodId);
    res.status(200).json(product);
  } catch (err) {
    const error = new HttpError("Failed fetch data! Please try again", 500);
    console.log(err);
    return next(err);
  }
};


export const deleteProduct = async (req, res, next) => {
   const productId = req.params.prid;

   let request;
   try {
    request = await Product.findById(productId);
   } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete the request",
            500
        );
        return next(error);
   }

   if (!request) {
    const error = new HttpError("We could not find a project for given id", 404);
    return next(error);
   }

   try {
    await Product.deleteOne({ _id: productId });
   } catch(err) {
    const error = new HttpError(
        "Something went wrong. Could not delete the project.",
        500
    );
    return next(error);
   }
   
   res.status(200).json({ message: "product deleted successfully!" });
};

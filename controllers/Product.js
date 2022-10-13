const productSchema = require("../models/Product");
const formidable = require("formidable");
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { validationResult } = require("express-validator");


class Product {
  async createProduct(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const errors = [];

        if (!fields.title) {
          errors.push({ msg: "title is required" });
        }

        if (fields.price < 1) {
          errors.push({ msg: "price should be above then $1" });
        }

        if (fields.discount < 1) {
          errors.push({ msg: "discount should be above then $1" });
        }

        if (fields.stock < 20) {
          errors.push({ msg: "stock should be above 20 unit" });
        }

        if (!fields.categories) {
          errors.push({ msg: "category is required" });
        }

        if (!fields.description) {
          errors.push({ msg: "description is required" });
        }

        if (!files["image1"]) {
          errors.push({ msg: "image1 is required" });
        }

        if (!files["image2"]) {
          errors.push({ msg: "image2 is required" });
        }

        if (!files["image3"]) {
          errors.push({ msg: "image3 is required" });
        }

        if (errors.length > 0) {
          return res.status(400).json({
            errors,
          });
        } else {
          const images = {};

          for (let i = 0; i < Object.keys(files).length; i++) {
            const mimeType = files[`image${i + 1}`].mimetype;
            const extension = mimeType.split("/")[1].toLowerCase();

            if (
              extension === "jpeg" ||
              extension === "png" ||
              extension === "jpg"
            ) {
              const imageName = uuidv4() + "." + `${extension}`;
              const __dirname = path.resolve();
              const newPath =
                __dirname + `/../frontend/public/images/${imageName}`;
              images[`image${i + 1}`] = imageName;

              fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                if (!err) {
                } else {
                  return res.status(400).json({
                    msg: "error",
                  });
                }
              });
            } else {
              const error = {};
              error[`image${i + 1}`] = `image ${
                i + 1
              } has invalid ${extension}`;
              errors.push(error);
            }
          }

          try {
            const Newproduct = await productSchema.create({
              title: fields.title,
              price: fields.price,
              discount: fields.discount,
              stock: fields.stock,
              category: fields.categories,
              colors: JSON.parse(fields.colors),
              sizes: JSON.parse(fields.sizes),
              image1: images["image1"],
              image2: images["image2"],
              image3: images["image3"],
              description: fields.description,
            });

            return res.status(200).json({
              msg: "create product succesfuly",
              Newproduct,
            });
          } catch (error) {
            return res.status(500).json({ error });
          }
        }
      }
    });
  }

  async products(req, res) {
    
    const page = req.params.page;

    const perPage = 4;

    const skip = (page - 1) * perPage;

    try {
      const count = await productSchema.find({}).countDocuments();
      const products = await productSchema
        .find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });

      return res.status(200).json({
        products,
        count,
        perPage,
      });

    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }

  async getProductById(req,res) {

      try {

          const { id } = req.params;

          console.log("id", id);

          const product = await productSchema.findOne({ _id: id });
          console.log("product", product);

          if (product) {
            return res.status(200).json( product);
          } else {
            return res.status(400).json({
              msg: "product not found",
            });
          }
        
      } catch (error) {
          return res.status(500).json({
            error:error.message
          })
      }
    
  

  }

  async updateProduct(req,res) {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors
          .array({ onlyFirstError: true })
          .map((err) => extractedErrors.push({ msg: err.msg }));

        return res.status(400).json({
          errors: extractedErrors,
        });
      }

      else {

          try {

              const {_id,title,price,discount,stock,colors,sizes,description,categories} = req.body;

              const response = await productSchema.updateOne({_id},{$set:
               {title,price,discount,category:categories,stock,colors,sizes,description
              }});

              return res.status(200).json({
                msg:'product has succefuly update'
              })
            
          } catch (error) {
             return res.status(500).json({
                error
             });
          }

      }
  
  }

  

  async deleteProduct(req,res) {
    
    const {id} = req.params;

    const product = await productSchema.findOne({_id:id});


        if (!product) {
          return res.status(404).json({
            msg: "product not found",
          });
        }

        [1,2,3].forEach((number) => {
            const key = `image${number}`;
            let image = product[key]; 

            let __dirname = path.resolve();
            let imagePath = __dirname + `/../frontend/public/images/${image}`;
         
            fs.unlink(imagePath,(err) => {
              
                if(err)
                {
                 throw new Error(err); 
                }
            })
        })
        await productSchema.deleteOne({_id:id});
        return res.status(200).json({
          msg:'product succefuly'
        })

  }
}

module.exports = new Product;

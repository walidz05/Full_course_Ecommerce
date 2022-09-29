const { validationResult } = require("express-validator");
const categoryModel = require("../models/Category");


class Category {

  async create(req,res){

      
    const { name } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const extractedErrors = [];
      errors
        .array({ onlyFirstError: true })
        .map((err) => extractedErrors.push({ msg: err.msg }));

      return res.status(422).json({
        errors: extractedErrors,
      });
    }

    else {

      const categoryName = await categoryModel.findOne({name})

      if(categoryName)
      {
         return res.status(400).json({
           errors:[{msg:'category already exist'}]
         });
      }
      
      await categoryModel.create({
        name
      })

         return res.status(200).json({
            msg: "category has created successfuly"
         });


    }

  }
}

module.exports = new Category;


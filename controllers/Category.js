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

  async categories(req,res){
  
    const page = req.params.page;

    const perPage = 4

    const skip = (page - 1) * perPage;

    try {

      const count = await categoryModel.find({}).countDocuments();
      const categories = await categoryModel
        .find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });

      return res.status(200).json({
          categories,count,perPage  
      })
      
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  async findByIdCategory(req,res){
    
    try {

      const id = req.params.id;
    
      const category = await categoryModel.findById({_id:id });

      if(!category)
      {
        return res.status(404).json({errors:[{msg:'category not found'}]})
      }
      else{
        return res.status(200).json({
        category
      })
      }
      
    } catch (error) {

      return res.status(500).json({error})
      
    }
    
  }

  async updateCategory(req,res) {

    try {


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

      const {id,name} = req.body;

      const findCategory = await categoryModel.findOne({id});
    
      if(findCategory.name != name)
      {
            await categoryModel.updateOne({ _id: id }, { $set: { name } });
            return res.status(200).json({
              msg: "update succesfuly",
            });
      }

       return res.status(400).json({
         errors: [{ msg: "category already exist" }],
       });

       
      
      
      
    } catch (error) {
        return res.status(500).json({
          error
        });
    }

  }

  async deletedCategory(req,res) {
    
    try {

      const id = req.params.id;

      const findCategory = await categoryModel.findOne({_id:id})

      if(!findCategory)
      {

          return res.status(404).json({
            errors:[{msg:'category not found'}] 
          });
      }

      else {
        await categoryModel.deleteOne({_id:id});
        return res.status(200).json({
            msg:'category has deleted succesfuly'
        });
      }

      
    } catch (error) {

          return res.status(500).json({
            error
         });
    }

  }

  async allCategories(req,res){

    try {

      const categories = await categoryModel.find({});

      return res.status(200).json({
        categories
      })
      
    } catch (error) {
      
    }

  }

  async randomCatgories(req,res){
    
    try {

        const categories = await categoryModel.aggregate([
          {$sample : {size:3} }
        ]);

        return res.status(200).json({
          categories
        })
      
    } catch (error) {
          return res.status(500).json({
              error
          });
    }

  }

}

module.exports = new Category;


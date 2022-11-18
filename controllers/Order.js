const OrderModel = require('../models/Order');
const reviewModel = require('../models/Review');
const productModel = require('../models/Product');

class Order{

      async getOrders(req,res)
      {

      const query = req.query;

      const perPage = 4;

      const skip = (query.page - 1) * perPage;

      const option = query.userId ? {userId:query.userId} : {};

      try {
    
      const count = await OrderModel.find(option).countDocuments();
      const orders = await OrderModel.find(option)
        .populate(
          "productId",
          "-colors -sizes -createdAt -updatedAt -image2 -image3"
        )
        .populate("userId", "-password -createdAt -updatedAt -admin")
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });

      return res.status(200).json({
        orders,
        count,
        perPage,
      });
            
      } catch (error) {
          return res.status(500).json({
            msg:error.message
          });  
      } 
      }

      async orderDetails(req,res){
        
        const {id} = req.params;

        try {

          const details = await OrderModel.findOne({_id:id}).populate(
          "productId",
          "-colors -sizes -createdAt -updatedAt -image2 -image3"
        )
        .populate("userId", "-password -createdAt -updatedAt -admin");

          return res.status(200).json({
            details,
          });

        } catch (error) {
          return res.status(500).json({
            error
          })
        }

      }

      async delivred(req,res)
      {
         const { id, status } = req.query;

         let option = {};

         //by admin
         if (status === "delivered") {
           option = { status: true };
         }

         //by user
         else if (status === "received") {
           option = { received: true };
         }

         try {
           const updateReceived = await OrderModel.findByIdAndUpdate(
             id,
             option,
             { new: true }
           );

           return res.status(200).json({
             msg:
               status === "delivered"
                 ? "order has delivered"
                 : status === "received" && "Order has received",
           });
         } catch (error) {
           return res.status(500).json({
             error,
           });
         }
      }  

      async createReview(req,res)
      {

        const {rating,comment,user,product,order} = req.body;        
        try {

            const review = await reviewModel.create({
              rating: parseInt(rating),
              comment,
              product: product,
              user: user.id,
            });

            await OrderModel.findByIdAndUpdate(
              order._id,
              { review: true },
              { new: true }
            );

            await productModel.findOneAndUpdate(
              { _id: product },
              { $push: { reviews: review._id } },
              { new: true }
            );

            return res.status(200).json({
              msg: "created has created successfuly",
            });

        } catch (error) {
          return res.status(400).json({
            errors:error.message
          })
        }
      }   
}


module.exports = new Order();

const OrderModel = require('../models/Order');

class Order{

      async getOrders(req,res)
      {

        const page = req.params.page;

        const perPage = 4;

        const skip = (page - 1) * perPage;

      try {
            
      const count = await OrderModel.find({}).countDocuments();
      const orders = await OrderModel.find({})
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
            error,
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
        const {id} = req.params;

        try {

          const order = await OrderModel.findOne({_id:id});

          if(order)
          {
            const updateDeliverd = await OrderModel.findByIdAndUpdate(id,{status:true},{new:true})
            
            return res.status(200).json({
              msg:'delivred status has updated succesufly'
            })
          }

        } catch (error) {
          return res.status(500).json({
            error
          })
        }
      }

}


module.exports = new Order();

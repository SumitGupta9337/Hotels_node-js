const express = require('express');
const router = express.Router();
const order = require('../models/Order');
const user = require('../models/User');
const table = require('../models/Table');
const MenuItem = require('../models/Menu');
const {jwtAuthMiddleware} = require('../middlewares/jwt')

router.get('/', async (req,res)=>{
    try {

        const data = await order.find();
        console.log('data fetched');
        res.status(200).json(data)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:id', async (req,res)=>{
    try {
    

        const data = await order.findById(req.params.id);

        if(!data)
        {
            return res.status(404).json({error: "order not found"})
        }

        console.log('data fetched');
        res.status(200).json(data)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/',jwtAuthMiddleware, async (req, res) => {
    try {

        const { customer, waiter, table, items } = req.body;

        if(!items || items.length === 0)
        {
            return res.status(400).json({
                error: "Order must contain one order "
            })
        }

        // Check customer exists
        const customerExists = await user.findById(customer);

        if (!customerExists) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }

        // Check table exists
        const tableExists = await table.findById(table);

        if (!tableExists) {
            return res.status(404).json({
                error: "Table not found"
            });
        }

        let orderItems = [];
        let totalAmount = 0;

        for (const item of items) {

            const menu = await MenuItem.findById(item.menuItem);

            if (!menu) {
                return res.status(404).json({
                    message: "Menu item not found"
                });
            }

            orderItems.push({
                menuItem: menu._id,
                quantity: item.quantity,
                price: menu.price
            });

            totalAmount += menu.price * item.quantity;
        }

        const newOrder = new order({
            customer,
            waiter,
            table,
            items: orderItems,
            totalAmount
        });

        const response = await newOrder.save();

        res.status(201).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

router.put('/:id', jwtAuthMiddleware, async (req,res)=>{
    try {
        const orderId = req.params.id;
        const updateOrderData= req.body;

        const response = await order.findByIdAndUpdate(orderId , updateOrderData,{
            new : true,
            runValidators: true
            
        });

        if(!orderId)
        {
            return res.status(401).json({error: "Order not found"})
        }

        console.log('Order data updated sucessfully');
        res.status(200).json(response)


    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id' ,jwtAuthMiddleware, async (req, res)=>{
    try{
        const response = await order.findByIdAndDelete(req.params.id);

        if(!response)
        {
            return res.status(404).json({error: "order id not found"})
        }

        console.log("order Deleted ")
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})
module.exports = router;
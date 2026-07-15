const express = require('express');
const router = express.Router();
const user = require('./../models/User');
const table = require('./../models/Table');
const {jwtAuthMiddleware} = require('../middlewares/jwt')
const Order = require("../models/Order");   

router.get('/', async (req,res)=>{
    try {

        const data = await table.find();
        console.log('data fetched');
        res.status(200).json(data)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:id/details', async (req,res)=>{
    try {
    
        console.log("Requested ID:", req.params.id);
        const tableData = await table.findById(req.params.id);
        console.log("Table:", tableData);
        if(!tableData)
        {
           return res.status(404).json({error: "Table not found"})
        }

        const order = await Order.findOne({
            table: req.params.id,
            status: {
                $ne: "served"
            }
                    
        })
        .populate("customer","-password")
        .populate("waiter","-password")
        .populate("items.menuItem", "name");
        console.log(order);

        console.log('data fetched');
        res.status(200).json({
            table: tableData,
            currentOrder: order,
            message: "No active order for this table."
        });

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/',jwtAuthMiddleware, async (req, res)=>{
    try{
        const data = req.body
        const newtable = new table(data);

        const existingTable = await table.findOne({
            tableNumber: data.tableNumber
        });

        if (existingTable) {
            return res.status(400).json({
                error: "Table number already exists"
            });
        }

        const response = await newtable.save();
        console.log('Table data saved');
        res.status(201).json(response)


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.put('/:id',jwtAuthMiddleware,async (req,res)=>{
    try {
        const tableId = req.params.id;
        const updateTableData= req.body;

        const response = await table.findByIdAndUpdate(tableId , updateTableData,{
            new : true,
            runValidators: true
            
        });

        if(!tableId)
        {
            return res.status(404).json({error: "Table not found"})
        }

        console.log('Table data updated sucessfully');
        res.status(200).json(response)


    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id' , jwtAuthMiddleware , async (req, res)=>{
    try{
        const response = await table.findByIdAndDelete(req.params.id);

        if(!response)
        {
            res.status(404).json({error: "Table not found"})
        }

        console.log("table Deleted ")
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router;
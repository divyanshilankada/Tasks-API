const TaskModel = require('../models/taskModel');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {

    try{

        const tasks = await TaskModel.find();
        res.status(200).json({
            tasks:tasks
        })
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


router.get('/:id', async (req, res) => {

    try{

        const task = await TaskModel.findOne({_id:req.params.id});

        if(task)
        {
            res.status(200).json({
                task
            });
            return;
        }
        else
        {
            res.status(404).json({
                message:"There is no task at that id"
            })
        }
        
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});



router.post('/', async (req, res) => {

    try{

        if(req.body.tasks)
        {
            let idArr = [];

            for(let i=0; i<req.body.tasks.length; i++)
            {
                const tasks = await TaskModel.create(req.body.tasks[i]);
                idArr.push(tasks._id);
            }

            res.status(201).json({
                tasks : idArr
            })
        }
        else
        {
            const tasks = await TaskModel.create(req.body);
    
            res.status(201).json({
                id:tasks._id
            })
        }
    }
    catch(e){

        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


router.put('/:id', async (req, res) => {

    try{

        const task = await TaskModel.findOne({_id:req.params.id})

        if(task)
        {
            const tasks = await TaskModel.updateOne({_id:req.params.id}, req.body);
            res.status(204).json({});
        }
        else
        {
            res.status(404).json({
                message:"There is no task at that id"
            })
        }
        
        

    }
    catch(e){
        console.log("kkk")

        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


router.delete('/', async (req, res) => {

    try{

        console.log(req.body.tasks);
        if(req.body.tasks)
        {

            for(let i=0; i<req.body.tasks.length; i++)
            {
                console.log(req.body.tasks[i].id)
                const tasks = await TaskModel.deleteOne({_id:req.body.tasks[i].id});
            }

            res.status(204).json({
                
            });  
        }
                  
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});



router.delete('/:id', async (req, res) => {

    try{
 
            const task = await TaskModel.deleteOne({_id:req.params.id});
            res.status(204).json({
                
            });  

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


module.exports = router;
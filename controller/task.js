import {Task} from '../model/task.js'



export const newTask= async (req,res)=>{
    try {
        const {title, description} = req.body

    await Task.create({
        title,
        description,
        user:req.user
    })

    res.json({
        message: "Task added successfully"
    }) 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    } 
}

export const allTask = async (req,res)=>{

    try {
        const userId = req.user._id
        const task = await Task.find({user: userId})
    res.status(200).json({
        success: true,
        task
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const updateTask = async (req,res)=>{
    try {
        const {id} = req.params
        const task = await Task.findById(id)

    if(!task){
        return res.status(200).json({
            success: false,
            message: "Invalid id"
        })
    }
    task.isCompleted = !task.isCompleted
    await task.save()
    res.json({
        success: true,
        message: "updated successfully"
    })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })  
    }
}


export const deleteTask = async (req,res)=>{
    try {
        const {id} = req.params
    const task = await Task.findById(id)
    if(!task){
        return res.status(404).json({
            success: false,
            message: "Invalid Id"
        })
    }
    await task.deleteOne()
    res.status(200).json({
        success: true,
        message: "deleted successfully"
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
          }) 
    }
    
}
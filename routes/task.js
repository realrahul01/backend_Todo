import express from 'express'
import { allTask, deleteTask, newTask, updateTask } from '../controller/task.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()


// api for create task
router.post('/new', isAuthenticated ,newTask)


// api to get all the task belonging to the same user
router.get('/my', isAuthenticated, allTask)


// api to update the task
router.put('/:id', updateTask)

// api to delete the task
router.delete('/:id', deleteTask)


export default router


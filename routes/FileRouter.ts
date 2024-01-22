import express from 'express'
import { uploadMiddleware } from '../utils/HandleFile';
import { getItems, createItem, getItem, deleteItem } from '../controllers/FileController';
// import { validatorGetItem } from '../validators/storageValidator.js'


export const fileRouter = express.Router();

fileRouter.get('/', getItems)
fileRouter.get('/:id', getItem)
fileRouter.post("/", uploadMiddleware.single("myfile"), createItem)
fileRouter.delete('/:id', deleteItem);
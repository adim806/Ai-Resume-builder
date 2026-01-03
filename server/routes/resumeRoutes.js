import express from "express";
import protect from "../middlewares/authMIddleware.js";
import { createResume, deleteResume, getPublicResumeById, updateResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post('/create',protect, createResume);
resumeRouter.post('/update', upload.single('image'),protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getPublicResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;
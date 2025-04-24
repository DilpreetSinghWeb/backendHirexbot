import express from 'express';
import { CareersController, ContactsController } from '../controllers/homeController.js';


const router = express.Router();

router.post('/careers', CareersController);
router.post('/contact',ContactsController);
export default router;

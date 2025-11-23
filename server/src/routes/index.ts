import express from 'express';
import AuthController from '../controllers/AuthController';
import CardController from '../controllers/CardController';

const router = express.Router();

router.post('/auth/register', (req, res) => AuthController.register(req, res));
router.post('/auth/login', (req, res) => AuthController.login(req, res));

router.get('/cards', (req, res) => CardController.getAllCards(req, res));
router.get('/cards/:cardId', (req, res) => CardController.getCardById(req, res));

export default router;

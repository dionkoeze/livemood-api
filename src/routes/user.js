import { Router } from 'express';
import { get_user } from '../controllers/user';

const router = Router();


router.get('/', async (req, res) => {
    res.status(200).json(await get_user(req.token.id));
});


export default router;

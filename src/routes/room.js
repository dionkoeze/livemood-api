import { Router } from 'express';
import { create_room, get_room, update_room, delete_room } from '../controllers/room';
import { check_owner } from './guard';

const router = Router();


router.post('/', async (req, res) => {
    try {
        const room = await create_room(req.body, req.token.id);
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});


router.get('/:id', check_owner);

router.get('/:id', async (req, res) => {
    try {
        const room = await get_room(req.params.id)
        res.status(200).json(room);
    } catch (err) {
        res.status(404).json({
            error: err.message,
        });
    }
});


router.put('/:id', check_owner);

router.put('/:id', async (req, res) => {
    try {
        const room = await update_room(req.params.id, req.body);
        res.status(200).json(room);
    } catch(err) {
        res.status(404).json({
            error: err.message,
        });
    }
});


router.delete('/:id', check_owner);

router.delete('/:id', async (req, res) => {
    try {
        await delete_room(req.params.id);
        res.status(200).end();
    } catch (err) {
        res.status(404).json({
            error: err.message,
        });
    }
});


export default router;

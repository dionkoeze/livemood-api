import { Router } from 'express';
import { register, get_account_token, get_anonymous_token } from '../controllers/auth';

const router = Router();


router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    await register(email, password);
    
    res.status(201).end();
});


router.post('/auth', async (req, res) => {
    const { type } = req.body;

    const maxAge = 1000 * parseInt(process.env.TOKENEXPIRATION);

    if (type === "anonymous") {
        const token = get_anonymous_token();

        res.cookie("token", token, { httpOnly: true, secure: true, maxAge})
            .json({
                status: "authorized-anonymous",
            });
    } else if (type === "account") {
        const { email, password } = req.body;
        let token;

        try {
            token = await get_account_token(email, password);
        } catch (_) {
            res.status(401).json({
                status: "not-authorized",
                message: "credentials invalid",
            });
        }

        res.cookie("token", token, { httpOnly: true, secure: true, maxAge })
            .json({
                status: "authorized-account",
            });
    } else {
        res.status(401).json({
            status: "not-authorized",
            message: "auth request should have type account or anonymous",
        });
    }
});


export default router;

import { verify_token } from "../controllers/auth";
import User from "../models/user";


export function check_token(req, res, next) {
    try {
        req.token = verify_token(req.cookies.token);
    } catch (_) {
        res.status(401).end({
            message: 'invalid token',
        });
        return;
    }
    
    next();
}

export async function check_owner(req, res, next) {
    console.log(req.token.id);
    console.log(req.params.id);

    const user = await User.findById(req.token.id);

    if (user.owns.includes(req.params.id)) {
        next();
    } else {
        res.status(401).json({
            message: 'insufficient rights',
        });
    }
}

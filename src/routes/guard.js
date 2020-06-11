import { verify_token } from "../controllers/auth";


export default function check_token(req, res, next) {
    try {
        req.token = verify_token(req.cookies.token);
    } catch (_) {
        res.status(401).end();
        return;
    }
    
    next();
}

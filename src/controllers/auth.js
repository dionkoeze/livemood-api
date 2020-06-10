import User from '../models/user';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import build_token from '../util/token';
import { is_email } from '../util/validation';


export async function register(email, password) {
    let valid_password = true;
    if (!password) {
        valid_password = false;
        password = "fake";
    }

    const pwhash = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));

    if (valid_password) {
        const user = new User({
            email,
            pwhash,
        });
    
        try {
            await user.save();

            // TODO send verification email
        } catch (_) {} // don't handle error, it has no effect on response
    }
}


export async function get_anonymous_token() {
    const payload = build_token(undefined, [], [], []);

    const maxAge = parseInt(process.env.TOKENEXPIRATION);

    return jwt.sign(payload, process.env.SECRET, {expiresIn: maxAge});
}


export async function get_account_token(email, password) {
    if (!is_email(email)) {
        throw new Error('email is malformed');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('user not found');
    }

    // TODO check this after email verication is implemented
    // if (!user.active) {
    //     throw new Error('user is inactive');
    // }

    if (!await bcrypt.compare(password, user.pwhash)) {
        throw new Error('password does not match');
    }

    const payload = build_token(user._id, user.owns, user.mods, user.memberOf);

    const maxAge = parseInt(process.env.TOKENEXPIRATION);

    return jwt.sign(payload, process.env.SECRET, {expiresIn: maxAge});    
}

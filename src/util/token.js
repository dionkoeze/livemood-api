import { Types } from 'mongoose';

export default function build_token(id, owns, mods, memberOf) {
    if (!id) {
        id = Types.ObjectId();
    }
    
    return {
        id,
        owns,
        mods,
        memberOf,
    };
}
import User from '../models/user';


export async function get_user(id) {
    const user = await User.findById(id);

    return {
        id: user._id,
        email: user.email,
        owns: user.owns,
        mods: user.mods,
        memberOf: user.memberOf,
    };
}

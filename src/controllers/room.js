import Room from '../models/room';
import User from '../models/user';

async function get_room_info(room) {
    const owners_query = User.find({
        owns: room._id,
    }, {
        email: true,
        _id: false,
    });
    const moderators_query = User.find({
        mods: room._id,
    }, {
        email: true,
        _id: false,
    });
    const members_query = User.find({
        memberOf: room._id,
    }, {
        email: true,
        _id: false,
    });

    const [owners, moderators, members] = await Promise.all([owners_query, moderators_query, members_query]);

    return {
        id: room._id,
        room: room.name,
        private: room.private,
        owners: owners.map(owner => owner.email),
        moderators: moderators.map(moderator => moderator.email),
        members: members.map(member => member.email),
        // owners,
        // moderators,
        // members,
        pinned: room.pinned,
        polls: room.polls,
    };
}

export async function create_room(data, user_id) {
    const room = new Room(data);
    
    await room.save();

    await User.updateOne({_id: user_id}, {$push: {owns: room._id}});

    return await get_room_info(room);
}

export async function get_room(id) {
    const room = await Room.findById(id);

    if (!room) {
        throw new Error('room does not exist');
    }

    return await get_room_info(room);
}

export async function update_room(id, data) {
    await Room.findOneAndUpdate({ _id: id }, data);
    // const room = await Room.findByIdAndUpdate(id, data);

    const room = await Room.findById(id);

    if (!room) {
        throw new Error('room does not exist');
    }

    return await get_room_info(room);
}

export async function delete_room(id) {
    await Room.deleteOne({ _id: id });
}
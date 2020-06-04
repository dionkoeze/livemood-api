import { Schema, model } from 'mongoose';
import PollSchema from './poll';
import { is_valid_uuid, is_valid_name } from '../util/validation';

const RoomSchema = new Schema({
    id: {
        type: String,
        required: [true, 'room id required'],
        validate: {
            validator: (v) => is_valid_uuid(v),
            message: (props) => `${props.value} is not a valid room id`,
        },
    },
    name: {
        type: String,
        required: [true, 'room name required'],
        validate: {
            validator: (v) => is_valid_name(v),
            message: (props) => `${props.value} is not a valid room name`,
        },
    },
    private: {
        type: Boolean,
        default: false,
    },
    owners: {
        type: [String],
        required: [true, 'room needs owners'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'owners array cannot be empty',
        },
    },
    pinned: {
        type: [String],
        default: [
            'Cooooooool!',
            'Need... Coffee...',
            'Too fast!',
            'A little quicker :)',
        ],
    },
    polls: {
        type: [PollSchema],
        validate: {
            validator: (v) => unique_array(v.map(p => p.name)),
            message: 'polls in a room need unique names',
        },
    },
});


export default model('room', RoomSchema);

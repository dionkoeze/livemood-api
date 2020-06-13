import { Schema, model } from 'mongoose';
import PollSchema from './poll';
import { is_valid_name, unique_array } from '../util/validation';

const RoomSchema = new Schema({
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

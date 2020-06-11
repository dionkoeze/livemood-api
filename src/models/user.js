import { Schema, model } from 'mongoose';
import { is_email } from '../util/validation';


const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'user email required'],
        unique: true,
        validate: {
            validator: (v) => is_email(v),
            message: (props) => `${props.value} is not an email address`,
        },
    },
    pwhash: {
        type: String,
        required: [true, 'password hash is required'],
    },
    active: {
        type: Boolean,
        default: false,
    },
    owns: [{ type: Schema.Types.ObjectId, ref: 'room' }],
    mods: [{ type: Schema.Types.ObjectId, ref: 'room' }],
    memberOf: [{ type: Schema.Types.ObjectId, ref: 'room' }],
});


export default model('user', UserSchema);

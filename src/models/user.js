import { Schema, model } from 'mongoose';
import { is_email } from '../util/validation';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'user email required'],
        validate: {
            validator: (v) => is_email(v),
            message: (props) => `${props.value} is not an email address`,
        },
    },
    hash: {
        type: String,
        // ...
    }
});


export default model('user', UserSchema);

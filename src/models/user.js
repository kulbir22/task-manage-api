import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Tasks } from './tasks.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowerCase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, 
{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    //console.log("@@@ USER OBJECT", userObject)
    return userObject;
}

userSchema.methods.getAuthenticationToken = async function(){
    const user = this;
    //console.log("USER AUTH: ", user)
    const token  = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' });
    //console.log("TOKEN: ", token)
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Unable to Login!')
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to Login!')
    }

    return user;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    //console.log('just before saving')
    next()
})

userSchema.pre('remove', async function(next){
    const user = this;
    await Tasks.deleteMany({ owner: user._id })
    next()
})

export const User = mongoose.model('User', userSchema)
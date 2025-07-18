import mongoose, { mongo } from 'mongoose'
import { DB_URL } from './config.js'
import { Schema } from 'zod'

// Wait till mongoose connects
try {
  await mongoose.connect(DB_URL)
} catch (error) {
  console.log(error)
}
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
})

const AccountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 0
  }
})
const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)
export { User, Account }

import express, { application } from 'express'
import { Account, User } from '../db.js'
import { updateUser, UserDetails } from '../types.js'
import { createHash, validatePassword } from '../utils/hash.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'
import { authMiddleware } from '../middelware.js'

const app = express()

const userRouter = express.Router()

userRouter.get('/data', async (req, res) => {
  try {
    const data = await User.find({})
    res.status(200).json({
      data: data
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || ""
  
  const users = await User.find({$or : [{firstname : {'$regex' : filter, '$options' : 'i'}}, {lastname : {'$regex' : filter, '$options' : 'i'}}]}, {password : 0})
  const id = req.userId;
 
  const user = users.filter(user => user._id != id)
  console.log(id)
 
  if (users.length > 0) {
    return res.json({
      user
    })
  } else
    return res.json({
      message: 'Not found'
    })
})

userRouter.post('/signup', async (req, res) => {
  try {
    const user = req.body
    const { success } = UserDetails.safeParse(user)
    const existingUser = await User.findOne({ username: user.username })

    if (!success) {
      return res.status(400).send('User not created : Invalid input')
    } else if (existingUser) {
      return res.status(409).send('User already exists')
    } else {
      let hashedPass = await createHash(req.body.password)
      user.password = hashedPass
      const newUser = await User.create(user)
      const userId = newUser._id
      await Account.create({
        userId, 
        balance : 1 + Math.random() * 10000
      })
      const token = jwt.sign({ userId }, JWT_SECRET)
      return res.status(201).json({
        message: 'User created',
        token: token
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

userRouter.post('/signin', async (req, res) => {
try {
  const { username, password } = req.body
  const existingUser = await User.findOne({ username})
  const passwordExists = await validatePassword(existingUser.password, password)
  const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET)
  
  if (existingUser == null) {
    return res.status(411).json({
      message: 'User not found'
    })
  } else if (passwordExists) {
    return res.status(200).json({
      token: token
    })
  }
  return res.status(411).json({
    message: 'Error while logging in'
  })
} catch(err){
  return res.status(500).json({
    message: 'Internal server error'
  })
}
})

userRouter.put('/', authMiddleware, async (req, res) => {
  const {success} = updateUser.safeParse(req.body)
  
  if(!success){
    return res.status(403).json({
      message: 'Error while updating'
    })
  } else {
    if('password' in req.body){
      const password = await createHash(req.body.password)
      req.body.password = password;
    }
    
      await User.updateOne(
      { _id: req.userId },
      {
        $set: req.body
      }
    )
    return res.status(200).json({ msg: 'Updated successfully' })
  }
  
})

userRouter.get('/me', authMiddleware,  async(req, res) => {
 
  try {
    const user = await User.findOne({_id : req.userId})
    if(user){
      return res.status(201).json(user)
    }
    return res.status(404).json({
      message : 'User not found'
    })
  }catch(error){
    return res.status(500).json({
      message : 'Internal server error'
    })
  }
})
export { userRouter }

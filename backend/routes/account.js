import express from 'express'
import { Account } from '../db.js'
import { authMiddleware } from '../middelware.js'
import mongoose from 'mongoose'

const accountRouter = express.Router()
accountRouter.use(authMiddleware)
accountRouter.get('/balance', async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId })

    // Check if account exists
    if (!account) {
      console.log('No account found for userId:', req.userId)
      return res.status(404).json({ error: 'Account not found for this user' })
    }

    // If account exists, return the balance
    res.status(200).json({ Amount: account.balance })
  } catch (error) {
    console.error('Error fetching balance:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

accountRouter.post('/transfer', async (req, res) => {
  try {
    const session = await mongoose.startSession()
   
    session.startTransaction()
    const { to, amount } = req.body
   
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    )

    if (!account || account.balance < amount) {
      await session.abortTransaction()
      return res.status(400).json({
        message: 'Insufficient balance'
      })
    }
    const toAccount = await Account.findOne({ userId: to }).session(session)
    if (!toAccount) {
      await session.abortTransaction()
      return res.status(400).json({
        message: 'Invalid account'
      })
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session)
    await Account.updateOne(
      { userId : to },
      { $inc: { balance: amount } }
    ).session(session)

    await session.commitTransaction()
    res.json({
      message: 'Transaction successfull'
    })
  } catch (err) {
    return res.status(403).json({
      message: 'Transaction failed'
    })
  }
})

export { accountRouter }

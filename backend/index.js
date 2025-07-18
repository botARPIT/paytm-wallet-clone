import express from 'express'
import cors from 'cors'
import { mainRouter } from './routes/index.js'

const app = express()
app.use(express.json())
const PORT = 3001
app.use(cors())
app.use('/api/v1', mainRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

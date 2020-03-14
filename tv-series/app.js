import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

const PORT = process.env.PORT || 4002
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const client = new MongoClient(process.env.BASE_URL, { useUnifiedTopology: true })
client.connect((err) => {
  if (err) {
    console.log('Error connection ', err)
  } else {
    console.log('Success connection')
    const db = client.db(process.env.DB_NAME)
    app.use((req, res, next) => {
      req.db = db
      next()
    })
    app.use(routes)
    app.use(errorHandler)
    app.listen(PORT, () => {
      console.log('Server is listening on PORT ' + PORT)
    })
  }
})

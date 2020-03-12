import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import routes from './routes'

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
app.use(morgan('tiny'))
app.use(routes)

app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT)
})
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectBD from './config/db.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'

import productRoutes from './Routes/products.routes.js'
import userRoutes from './Routes/user.routes.js'
import orderRoutes from './Routes/order.routes.js'


dotenv.config()

connectBD()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server running in', process.env.NODE_ENV, 'mode on port', port))
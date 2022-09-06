import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../Models/User.model.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized , Token Faild')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }

})

export { protect }
import User from '../Models/User.model.js'
import expressAsyncHandler from "express-async-handler"
import generateToken from '../utils/generateToken.js'


// @desc    Auth the user & get token
// @route   POST /api/user/login
// @access  Public
const authUser = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(401)
            throw new Error('INVAID EMAIL OR PASSWORD')
        }

    }
)

// @desc    Resgister new user
// @route   post /api/users
// @access  Public
const registerUser = expressAsyncHandler(
    async (req, res) => {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        const user = await User.create({ name, email, password })

        if (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }

    }
)


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id)
        if (user) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
        }
        else {
            res.status(404)
            throw new Error('User not found')
        }
    }
)

// @desc    Update user Profile
// @route   PUT /api/users/profile
// @access  Private
const updataUserProfile = expressAsyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save()

            res.json({
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            })

        }
        else {
            res.status(404)
            throw new Error('User not found')
        }
    }
)


export { authUser, getUserProfile, registerUser, updataUserProfile }
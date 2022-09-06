import expressAsyncHandler from "express-async-handler"
import Order from '../Models/order.model.js'


// @desc    Create New Order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = expressAsyncHandler(
    async (req, res) => {
        const {
            orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        } = req.body

        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error('No Order Items')
            return
        }
        else {
            const newOrder = new Order({
                orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
            })

            const createdOrder = await newOrder.save()
            res.status(201).json(createdOrder)
        }

    }
)

// @desc    Fetch single order
// @route   GET /api/orders/id
// @access  Private
export const getOrderById = expressAsyncHandler(
    async (req, res) => {
        const id = req.params.id

        const order = await Order.findById(id).populate("user", "name email")
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404)
            throw new Error('order not found')
        }

    }
)

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = expressAsyncHandler(
    async (req, res) => {
        const id = req.params.id

        const order = await Order.findById(id)
        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
            const updatedOrder = await order.save()
            res.status(201).json(updatedOrder)
        } else {
            res.status(404)
            throw new Error('order not found')
        }

    }
)
// @desc    Get logged in user's orders
// @route   PUT /api/orders/myorders
// @access  Private
export const getMyOrders = expressAsyncHandler(
    async (req, res) => {
        const orders = Order.find({ user: req.user._id })
        res.json(orders)
    }
)



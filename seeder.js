import mongoose from "mongoose"
import dotenv from "dotenv"
import Users from "./data/users.js"
import Products from "./data/products.js"
import User from "./Models/user.model.js"
import Product from "./Models/product.model.js"
import Order from "./Models/order.model.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(Users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = Products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('data imported!')
        process.exit()

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const DestroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('data destroyed')
        process.exit()

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    DestroyData()
}
else {
    importData()
}
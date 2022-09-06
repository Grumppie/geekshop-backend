import mongoose from "mongoose"

const connnectDB = async () => {
    try {
        const con = mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        })

        console.log(`Mongodb connected!!`)

    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

export default connnectDB
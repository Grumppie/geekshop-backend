import bcrypt from "bcryptjs"

const Users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: 'Sarthak Pawar',
        email: 'sarthak@example.com',
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: 'Nice Man',
        email: 'nice@example.com',
        password: bcrypt.hashSync("123456", 10),
    }
]

export default Users
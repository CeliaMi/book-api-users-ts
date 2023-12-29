import mysql from "mysql2/promise"

const CONFIG : object = {
    host: 'localhost',
    database: '',
    user: 'root',
    password: 'root',
    port: 3306
}

async function connectionDb(){
    try{
    const connection = await mysql.createConnection(CONFIG);
    return connection;
    } catch(error) {
        console.log(error)
    }
}

const UserModel = {



    async getUsers(){
        // SELECT * FROM user;
        const connection = await connectionDb();
        const users = connection?.query('SELECT * FROM user')
        return users

    },
    async getUser(userId){
        // SELECT * FROM user WHERE id = userId;

    },
    async createUser(bodyData){
        // INSERT INTO user (name, email, role, password) VALUES();

    },
    async updateUser(userId, bodyData){
        //UPDATE user SET name=?, email = ?, role = ? , password = ? ,WHERE id = userId;

    },
    async deleteUser(userId){
        //DELETE FROM user WHERE id = userID;

    },
}

export default UserModel
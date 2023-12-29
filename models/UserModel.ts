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
    async getUser(userId: number){
        // SELECT * FROM user WHERE id = userId;
        const connection = await connectionDb();
        const users = connection?.query(`SELECT * FROM user  WHERE id = ${userId}`)
        return users

    },
    async createUser(bodyData : object){
        // INSERT INTO user (name, email, role, password) VALUES();

    },
    async updateUser(userId : number , bodyData : object){
        //UPDATE user SET name=?, email = ?, role = ? , password = ? ,WHERE id = userId;

    },
    async deleteUser(userId: number){
        //DELETE FROM user WHERE id = userID;

    },
}

export default UserModel
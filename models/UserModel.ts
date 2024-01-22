import db from "../database/db";
import { DataTypes, Model } from "sequelize";
import  { UserAttributes }  from '../interfaces/userInterface'


export interface UserModel extends Model<UserAttributes>, UserAttributes{}

const UserModel = db.define('users', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo name no puede estar vacío'
            },
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo email no puede estar vacío'
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo password no puede estar vacío'
            },

        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue : 'user',
    },
    

}, {
    timestamps: false
});
(async () => {
    await db.sync();
    console.log("All models were synchronized successfully.");
})();

export default UserModel
import db from "../database/db";
import { DataTypes, Model } from "sequelize";

interface UserAttributes {
    id?: number;
    name: string;
    email: string,
    password: string;
    role: string,
}

interface UserModel extends Model<UserAttributes>, UserAttributes{}

const UserModel = db.define<UserModel>('users', {

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
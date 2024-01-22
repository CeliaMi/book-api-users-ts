import { Model } from "sequelize";

export interface UserAttributes {
    id?: number;
    name: string;
    email: string,
    password: string;
    role?: string,
}

export interface sesionData{
    token: string;
    user: Model<UserAttributes, UserAttributes>;
}

export type newUser = Omit<UserAttributes, 'id'>


import { DataTypes, Model } from 'sequelize';
import db from '../config/dbConfig';

interface ClientAttributes {
  id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  password: string;
  role?: string;
  isVerified?: boolean;
  avatar?: string;
  token: string;
}

export class DispatchClientInstance extends Model<ClientAttributes> {
  public id!: string;
  public name!: string;
  public phoneNumber!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public isVerified!: boolean;
  public avatar!: string;
  public token!: string;
}

DispatchClientInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required',
        },
        notEmpty: {
          msg: 'Last name cannot be empty',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number is required',
        },
        notEmpty: {
          msg: 'Phone number cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU',
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client',
    },
  },

  {
    sequelize: db,
    modelName: 'Client',
  },
);

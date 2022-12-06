import { DataTypes, Model } from 'sequelize';
import db from '../config/dbConfig';

interface RiderAttributes {
  id?: string;
  name?: string;
  email?: string;
  password: string;
  phoneNumber?: string;
  city?: string;
  bikeDocument?: string;
  validId?: string;
  avatar?: string;
  isVerified?: boolean;
  role?: string;
  token: string;
}
export class DispatchRiderInstance extends Model<RiderAttributes> {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public city!: string;
  public bikeDocument!: string;
  public validId!: string;
  public avatar!: string;
  public isVerified!: boolean;
  public role!: boolean;
  public token!: string;
}

DispatchRiderInstance.init(
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'City is required',
        },
        notEmpty: {
          msg: 'City cannot be empty',
        },
      },
    },
    bikeDocument: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Bike Document is required',
        },
        notEmpty: {
          msg: 'Bike Document cannot be empty',
        },
      },
    },
    validId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'valid id is required',
        },
        notEmpty: {
          msg: 'valid id cannot be empty',
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'rider',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'rider',
    },
  },

  {
    sequelize: db,
    modelName: 'Rider',
  },
);

/*
 "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phoneNumber": "string",
  "city": "string",
  "bikeDocument": "string",
  "validId": "string",
  "avatar": "string"
*/

import 'dotenv/config' // Load .env file
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

// defingin user schema
const User = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    //   pre: hashPassword, // Hash password before saving
    },
    email: {
      type: String,
      required: true,
      unique: true,
    //   trim: true,
    //   validate: {
    //     validator: (value) => /.+@.+\..+/.test(value),
    //     message: 'Invalid email format',
    //   },
    },
    cnic: {
      type: String,
      required: true,
    //   validate: {
    //     validator: (value) => /^\d{13}$/.test(value),
    //     message: 'Invalid CNIC format',
    //   },
    },
  }, {
    collection: "users",
    timestamps: true, // Add createdAt and updatedAt fields
  });

    // encrypting password using mongoose-encryption
    User.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ['password']});

// creating user model
const model = mongoose.model("UserData", User);

// exporting user model default
export default model;
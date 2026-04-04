import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env.local');
const envDefaultPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });
dotenv.config({ path: envDefaultPath });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nooryak';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@nooryak.com';
    const password = 'adminpassword'; // User should change this later

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword });

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();

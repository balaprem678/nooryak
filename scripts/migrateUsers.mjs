import mongoose from 'mongoose';
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
  name: String,
  email: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find users missing name or role
    const usersToUpdate = await User.find({
      $or: [
        { name: { $exists: false } },
        { role: { $exists: false } }
      ]
    });

    console.log(`Found ${usersToUpdate.length} users to migrate.`);

    for (const user of usersToUpdate) {
      console.log(`Migrating user: ${user.email}`);
      user.name = user.name || 'Administrator';
      user.role = user.role || 'Admin';
      await user.save();
    }

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrate();

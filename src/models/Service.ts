import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name.'],
    maxlength: [100, 'Service name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a brief description.'],
  },
  content: {
    type: String, // HTML content from editor
    required: [true, 'Please provide content for the service page.'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this service.'],
    unique: true,
  },
  icon: {
    type: String, // Icon class or URL
    default: 'flaticon-settings',
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

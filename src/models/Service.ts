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

// Virtual for subcategories
ServiceSchema.virtual('subcategories', {
  ref: 'Subcategory',
  localField: '_id',
  foreignField: 'service',
});

// Ensure virtual fields are serialized
ServiceSchema.set('toJSON', { virtuals: true });
ServiceSchema.set('toObject', { virtuals: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

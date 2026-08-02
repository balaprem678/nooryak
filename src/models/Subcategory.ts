import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a subcategory name.'],
    maxlength: [100, 'Subcategory name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a brief description.'],
  },
  content: {
    type: String, // HTML content from editor
    required: [true, 'Please provide content for the subcategory page.'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this subcategory.'],
    unique: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Subcategory must belong to a service.'],
  },
  icon: {
    type: String, // Icon class or URL
    default: 'flaticon-settings',
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Compound index to ensure unique slug per service
SubcategorySchema.index({ service: 1, slug: 1 }, { unique: true });

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
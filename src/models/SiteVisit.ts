import mongoose from 'mongoose';

const SiteVisitSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  visitorId: {
    type: String, // Hashed IP or a generated client-side ID
    required: true,
  },
  userAgent: String,
}, { timestamps: true });

// Index for fast aggregation in dashboard
SiteVisitSchema.index({ timestamp: -1 });

export default mongoose.models.SiteVisit || mongoose.model('SiteVisit', SiteVisitSchema);

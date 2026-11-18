const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: "GharSwaad" },
    phone: { type: String, default: "+91 98765 43210" },
    whatsapp: { type: String, default: "919876543210" },
    email: { type: String, default: "hello@gharswaad.in" },
    address: { type: String, default: "Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018" },
    hours: { type: String, default: "Mon–Sat · 8:00 AM – 9:00 PM" },
    deliveryFee: { type: Number, default: 20 },
    freeDeliveryAbove: { type: Number, default: 300 },
    minOrder: { type: Number, default: 60 },
    upiId: { type: String, default: "gharswaad@upi" },
    acceptingOrders: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

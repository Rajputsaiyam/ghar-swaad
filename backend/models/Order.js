const mongoose = require('mongoose');

const cartLineSchema = new mongoose.Schema({
  key: { type: String, default: () => `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` },
  itemId: { type: String, default: "" },
  name: { type: String, required: true },
  portion: { type: String, default: "" },
  variant: { type: String, enum: ["Full", "Half", null, undefined], default: null },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1, default: 1 },
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, default: "" },
  deliveryType: {
    type: String,
    enum: ["Home", "Office", "Small Industry/Workplace"],
    default: "Office",
  },
  companyName: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    customer: { type: customerSchema, required: true },
    items: [cartLineSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    payment: {
      type: String,
      enum: ["Cash on Delivery", "UPI"],
      default: "Cash on Delivery",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Pending",
    },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Combo Meals", "Roti Meals", "Rice Meals", "Snacks", "Extras", "Meal Plans"],
    },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    halfPrice: { type: Number },
    portion: { type: String, required: true },
    ingredients: [{ type: String }],
    image: { type: String, default: "/assets/thali.jpg" },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

import mongoose, { Schema, model, models } from 'mongoose';

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Snacks', 'Drinks'],
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const MenuItem = models.MenuItem || model('MenuItem', MenuItemSchema);

export default MenuItem;

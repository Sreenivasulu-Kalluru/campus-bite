import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        menuItemId: {
          type: Schema.Types.ObjectId,
          ref: 'MenuItem',
          required: true,
        },
        name: String, // Store snapshot of name
        price: Number, // Store snapshot of price
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Accepted',
        'Cooking',
        'Ready',
        'Completed',
        'Cancelled',
      ],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'UPI'],
      default: 'Cash',
    },
  },
  { timestamps: true }
);

const Order = models.Order || model('Order', OrderSchema);

export default Order;

import mongoose from 'mongoose';

// Define the schema for Payment
const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create and export the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

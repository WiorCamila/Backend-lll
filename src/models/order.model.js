import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
    originalName: { type: String },
    filename: { type: String },
    reference: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    number: { type: String, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: Array,
    totalPrice: Number,
    status: { type: String, default: 'pending' },
    receipts: { type: [receiptSchema], default: [] }
}, { timestamps: true });

export const orderModel = mongoose.model('Order', orderSchema);
export const OrderModel = orderModel;
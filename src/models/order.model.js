import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    items: [
        {
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

export const OrderModel = mongoose.model('Orders', orderSchema);
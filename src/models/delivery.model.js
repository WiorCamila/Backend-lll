import { Schema, model } from 'mongoose';

const deliverySchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    delivery_person: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scheduled_date: { type: Date, required: true },
    delivery_notes: { type: String }
}, { timestamps: true });

export const deliveryModel = model('Deliveries', deliverySchema);
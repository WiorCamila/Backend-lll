import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    name: { type: String },
    originalName: { type: String },
    filename: { type: String },
    reference: { type: String },
    docType: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER' },
    documents: { type: [documentSchema], default: [] },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);
export const UserModel = userModel;
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'uploads/documents';

        if (req.baseUrl.includes('users')) {
            folder = 'uploads/documents';
        } else if (req.baseUrl.includes('orders') || req.baseUrl.includes('deliveries')) {
            folder = 'uploads/receipts';
        }

        ensureDir(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    // Permitir imágenes y PDFs
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('INVALID_FILE_TYPE'), false);
    }
};

export const uploader = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
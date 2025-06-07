const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Настройка хранилища файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Папка, куда сохраняются файлы
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Пример: file-123456789.jpg
    }
});

const upload = multer({ storage });

// Обработка загрузки одного файла
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
        filename: req.file.filename,
        mimetype: req.file.mimetype,
    });
});

module.exports = router;

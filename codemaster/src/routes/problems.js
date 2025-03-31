const express = require('express');
const router = express.Router();

// Danh sách bài tập
router.get('/', (req, res) => {
    res.render('problems/index', { title: 'Danh sách bài tập' });
});

// Chi tiết bài tập
router.get('/:id', (req, res) => {
    res.render('problems/detail', { 
        title: 'Chi tiết bài tập',
        problemId: req.params.id
    });
});

// Chạy code
router.post('/execute', (req, res) => {
    // TODO: Xử lý chạy code
    res.json({ output: 'Kết quả chạy code' });
});

module.exports = router; 
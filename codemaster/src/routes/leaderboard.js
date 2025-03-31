const express = require('express');
const router = express.Router();

// Trang bảng xếp hạng
router.get('/', (req, res) => {
    res.render('leaderboard/index', { title: 'Bảng xếp hạng' });
});

module.exports = router; 
const express = require('express');
const router = express.Router();

// Trang đăng nhập
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Đăng nhập' });
});

// Xử lý đăng nhập
router.post('/login', (req, res) => {
    // TODO: Xử lý đăng nhập
    res.redirect('/');
});

// Trang đăng ký
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Đăng ký' });
});

// Xử lý đăng ký
router.post('/register', (req, res) => {
    // TODO: Xử lý đăng ký
    res.redirect('/auth/login');
});

// Đăng xuất
router.get('/logout', (req, res) => {
    // TODO: Xử lý đăng xuất
    res.redirect('/');
});

module.exports = router;
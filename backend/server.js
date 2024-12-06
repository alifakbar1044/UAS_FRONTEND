const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Tentukan folder proyek dengan path absolut ke folder frontend
const projectDir = path.resolve(__dirname, '../frontend');

// Middleware untuk melayani file statis
app.use(express.static(projectDir));

// Authentication Middleware
const authenticateToken = async (req, res, next) => {
    const email = req.header('email');
    if (!email) return res.status(401).json({ error: 'Akses ditolak' });

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: 'User tidak ditemukan' });
        
        req.user = user.rows[0];
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Authentication Routes
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error('Registrasi error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Login berhasil',
            user: {
                email: user.rows[0].email,
                is_admin: user.rows[0].is_admin
            }
        });
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ error: err.message });
    }
});

// Route handler untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(projectDir, 'loginpage.html'));
});

// Route handler untuk halaman lainnya
app.get('/:page.html', (req, res) => {
    const requestedFile = path.join(projectDir, `${req.params.page}.html`);
    res.sendFile(requestedFile);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

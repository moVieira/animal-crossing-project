const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();

const SECRET = "minha_chave_super_secreta";

//cadastro
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ error: "Preencha todos os campos 🌱"});
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err) => {
            if(err) {
                console.error(err.message);
            return res.status(500).json({ error: "Erro ao registrar usuário ❌" });
    }
    res.json({ message: "🌸 Usuário registrado com sucesso!" });
    }
);
});

// 🔑 Login de usuário
router.post("/login", (req, res) => {
const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
        return res.status(500).json({ error: "Erro no banco ❌" });
    }
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado 🌱" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ error: "Senha incorreta ❌" });
    }

    // gera token válido por 1h
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

    res.json({
        message: `✨ Bem-vindo(a), ${user.username}!`,
        token
    });
    });
});

module.exports = router;
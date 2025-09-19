const express = require("express");
const router = express.Router();
const db = require("../database");
const verifyToken = require("../middleware/authMiddleware");

// ➕ Adicionar favorito (só logado)
router.post("/add", verifyToken, (req, res) => {
    const { villager_name } = req.body;

    if (!villager_name) {
    return res.status(400).json({ error: "Precisa informar villager_name 🌱" });
    }

db.run(
    "INSERT INTO favorites (user_id, villager_id) VALUES (?, ?)",
    [req.userId, villager_name],
    (err) => {
    if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Erro ao salvar favorito ❌" });
    }
    res.json({ message: `⭐ ${villager_name} foi adicionado aos favoritos!` });
    }
    );
});

// 📜 Listar favoritos (só logado)
router.get("/", verifyToken, (req, res) => {
db.all(
    "SELECT villager_id FROM favorites WHERE user_id = ?",
    [req.userId],
    (err, rows) => {
        if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Erro ao buscar favoritos ❌" });
        }
        res.json({
        message: "🌸 Seus villagers favoritos:",
        favorites: rows.map(r => r.villager_id)
        });
    }
);
});

module.exports = router;

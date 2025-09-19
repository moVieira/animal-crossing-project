const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "fffcc469-fe5a-4a82-b1a1-5634b6e99b45";
const BASE_URL = "https://api.nookipedia.com/villagers";

// 🎀 Função para filtrar os dados que queremos
function formatVillager(v) {
    return {
    name: v.name,
    species: v.species,
    personality: v.personality,
    birthday: v.birthday,
    image_url: v.image_url
    };
}

// 📜 Lista todos os villagers (resumidos)
router.get("/", async (req, res) => {
    try {
    const response = await axios.get(BASE_URL, {
        headers: {
        "X-API-KEY": API_KEY,
        "Accept-Version": "1.0.0"
        }
    });

    const villagers = response.data.map(formatVillager);
    res.json(villagers);
    } catch (error) {
    console.error("Erro detalhado:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao buscar villagers 😿" });
    }
});

// 🔎 Buscar villager específico por nome (resumido)
router.get("/:name", async (req, res) => {
    const { name } = req.params;

    try {
    const response = await axios.get(BASE_URL, {
        headers: {
        "X-API-KEY": API_KEY,
        "Accept-Version": "1.0.0"
        },
        params: { name }
    });

    if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: `Nenhum villager encontrado com o nome ${name} 🌱` });
    }

    res.json(formatVillager(response.data[0]));
    } catch (error) {
    console.error("Erro detalhado:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao buscar villager 🌸" });
    }
});

module.exports = router;

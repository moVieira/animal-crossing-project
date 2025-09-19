const express = require("express");
const app = express();



const authRoutes = require("./routes/auth");
const villagersRoutes = require("./routes/villagers");
const favoritesRoutes = require("./routes/favorites");

app.use(express.static("public"));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/villagers", villagersRoutes);
app.use("/favorites", favoritesRoutes);

app.listen(3000, () => {
    console.log("🌸 Servidor rodando em http://localhost:3000");
});
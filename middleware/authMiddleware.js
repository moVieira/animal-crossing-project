const jwt = require("jsonwebtoken");
const SECRET = "minha_chave_super_secreta";

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
    return res.status(403).json({ error: "Token não fornecido ❌" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({ error: "Token inválido ❌" });
    }
    req.userId = decoded.id; // salva o id do usuário no request
    next();
    });
}

module.exports = verifyToken;

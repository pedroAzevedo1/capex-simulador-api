const express = require("express");
const cors = require("cors");

const simulacaoRoute = require("./routes/simulacao");

const app = express();

app.use(cors());

app.use(express.json({
    limit: "5mb"
}));

app.use("/api", simulacaoRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

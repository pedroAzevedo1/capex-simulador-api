const {
    calcularCarteira
} = require("../services/calculadoraService");

exports.simular = (req, res) => {

    try {

        const resultado =
            calcularCarteira(req.body);

        return res.json(resultado);

    } catch (error) {

        return res.status(500).json({
            erro: error.message
        });

    }

};

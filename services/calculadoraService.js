function rentMensal(produto, cdi) {

    const rent =
        Number(produto.rent);

    switch(produto.tipo_rent){

        case "pct_cdi":
            return cdi * rent / 100;

        case "fixo":
            return rent;

        case "prefixo":
            return (
                Math.pow(
                    1 + rent / 100,
                    1 / 12
                ) - 1
            ) * 100;

        case "ipca":
            return 0.40 + rent / 12;

        default:
            return cdi;
    }

}
function projetarCarteira(
    patrimonio,
    aporte,
    rentabilidade,
    meses
){

    const historico = [];

    let saldo = patrimonio;

    historico.push(saldo);

    for(let i=1;i<=meses;i++){

        saldo =
            saldo *
            (1 + rentabilidade/100);

        saldo += aporte;

        historico.push(saldo);

    }

    return historico;
}
function calcularCarteira(data){

    const {

        produtos,
        aporte,
        horizonte,
        cdi

    } = data;

    const patrimonio =
        produtos.reduce(
            (acc,p) =>
            acc + Number(p.valor || 0),
            0
        );

    let rendimentoMensal = 0;

    produtos.forEach(produto => {

        const rm =
            rentMensal(produto,cdi);

        rendimentoMensal +=
            Number(produto.valor) *
            rm / 100;

    });

    const rentPonderada =
        patrimonio > 0
        ? rendimentoMensal /
          patrimonio * 100
        : 0;

    const historico =
        projetarCarteira(
            patrimonio,
            aporte,
            rentPonderada,
            horizonte
        );

    return {

        patrimonioAtual:
            patrimonio,

        rendimentoMensal,

        rentabilidade:
            rentPonderada,

        patrimonioFinal:
            historico[historico.length-1],

        evolucao:
            historico

    };

}

module.exports = {
    calcularCarteira
};

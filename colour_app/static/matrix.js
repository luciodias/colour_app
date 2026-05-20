function multiply(matrizA, colunasA, matrizB, colunasB) {
    const linhasA = Math.floor(matrizA.length / colunasA);
    const linhasB = Math.floor(matrizB.length / colunasB);

    // Verifica se a multiplicação é possível
    if (colunasA !== linhasB) {
        throw new Error("Número de colunas de A deve ser igual ao número de linhas de B");
    }

    const resultado = new Array(linhasA * colunasB).fill(0);

    for (let i = 0; i < linhasA; i++) {
        for (let j = 0; j < colunasB; j++) {
            for (let k = 0; k < colunasA; k++) {
                const a = matrizA[i * colunasA + k];
                const b = matrizB[k * colunasB + j];
                resultado[i * colunasB + j] += a * b;
            }
        }
    }

    return resultado;
}
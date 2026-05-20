function multiply(matrizA, colunasA, matrizB, colunasB) {
    const linhasA = Math.floor(matrizA.length/colunasA);
    const linhasB = Math.floor(matrizB.length/colunasB);
    console.log(linhasA)
    var resultado = new Array(linhasA*colunasB).fill(0)
    for (let i = 0; i < linhasA; i++) {
        for (let j = 0; j < colunasB; j++) {
            for (let k = 0; k < colunasA; k++) {
                resultado[i+colunasA*j] += matrizA[i+k*colunasA] * matrizB[k+j*colunasB];
            }
        }
    }
    return resultado
}
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.send('Envie os parâmetros n1 e n2 para as rotas /soma, /subtracao, /multiplicacao ou /divisao')
})

function lerNumeros(req) {
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    return { n1, n2, validos: !isNaN(n1) && !isNaN(n2) }
}

app.get('/soma', (req, res) => {
    const { n1, n2, validos } = lerNumeros(req)
    if (!validos) return res.send({ conta: "Valores inválidos." })
    res.send({ conta: `${n1} + ${n2} = ${n1 + n2}` })
})

app.get('/subtracao', (req, res) => {
    const { n1, n2, validos } = lerNumeros(req)
    if (!validos) return res.send({ conta: "Valores inválidos." })
    res.send({ conta: `${n1} - ${n2} = ${n1 - n2}` })
})

app.get('/multiplicacao', (req, res) => {
    const { n1, n2, validos } = lerNumeros(req)
    if (!validos) return res.send({ conta: "Valores inválidos." })
    res.send({ conta: `${n1} * ${n2} = ${n1 * n2}` })
})

app.get('/divisao', (req, res) => {
    const { n1, n2, validos } = lerNumeros(req)
    if (!validos) return res.send({ conta: "Valores inválidos." })
    if (n2 === 0) return res.send({ erro: "Não é possível dividir por zero." })
    res.send({ conta: `${n1} / ${n2} = ${n1 / n2}` })
})

app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080')
})

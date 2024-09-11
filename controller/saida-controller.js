const asyncHandler = require('express-async-handler');

const Saida = require("../model/saida-model");

const Stock = require ("../model/stock-model");

const {updateStockQuantity} = require("./stock-controller");

const createSaida = asyncHandler(async (req, res) => {

    const { produtoId, quantidade } = req.body;

    const q = (Number(quantidade))*-1;

    // Verifique se o produto existe no estoque antes de continuar
    const stock = await Stock.findById(produtoId);
    if (!stock) {
        res.status(404).json({ message: 'Produto não encontrado no estoque' });
        return;
    }

   

    // Crie a nova entrada
    const newEntrada = await Entrada.create({ produtoId, q });
    console.log("1")
    await newEntrada.save();

   


    // Atualize a quantidade no estoque
    await updateStockQuantity(produtoId, q);

    res.status(201).json(newEntrada);
});

module.exports={

    createSaida,
};
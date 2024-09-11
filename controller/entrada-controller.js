const Entrada = require('../model/entrada-model'); // Ajuste o caminho conforme necessário
const Stock = require("../model/stock-model");
const asyncHandler = require('express-async-handler');

// Criar uma nova entrada
const createEntrada = asyncHandler(async (req, res) => {
    const { produtoId, quantidade } = req.body;

    // Verifique se o produto existe no estoque antes de continuar
    const stock = await Stock.findById(produtoId);
    if (!stock) {
        res.status(404).json({ message: 'Produto não encontrado no estoque' });
        return;
    }

    // Crie a nova entrada
    const newEntrada = new Entrada({ produtoId, quantidade });
    await newEntrada.save();

    // Atualize a quantidade no estoque
    await updateStockQuantity(produtoId, quantidade);

    res.status(201).json(newEntrada);
});

// Obter todas as entradas
const getAllEntradas = asyncHandler(async (req, res) => {
    const entradas = await Entrada.find();
    res.status(200).json(entradas);
});

// Obter uma entrada específica pelo ID
const getEntradaById = asyncHandler(async (req, res) => {
    const entrada = await Entrada.findById(req.params.id);
    if (!entrada) {
        res.status(404).json({ message: 'Entrada não encontrada' });
        return;
    }
    res.status(200).json(entrada);
});

// Atualizar uma entrada específica pelo ID
const updateEntradaById = asyncHandler(async (req, res) => {
    const { produtoId, quantidade } = req.body;
    const entrada = await Entrada.findByIdAndUpdate(
        req.params.id,
        { produtoId, quantidade },
        { new: true }
    );
    if (!entrada) {
        res.status(404).json({ message: 'Entrada não encontrada' });
        return;
    }
    res.status(200).json(entrada);
});

// Deletar uma entrada específica pelo ID
const deleteEntradaById = asyncHandler(async (req, res) => {
    const entrada = await Entrada.findByIdAndDelete(req.params.id);
    if (!entrada) {
        res.status(404).json({ message: 'Entrada não encontrada' });
        return;
    }
    res.status(200).json({ message: 'Entrada deletada com sucesso' });
});

module.exports = {
    createEntrada,
    getAllEntradas,
    getEntradaById,
    updateEntradaById,
    deleteEntradaById
};

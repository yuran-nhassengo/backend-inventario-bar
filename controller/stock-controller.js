const asyncHandler = require ("express-async-handler");

const Stock = require("../model/stock-model");

const mongoose  = require("mongoose");
const Stock = require("../model/stock-model");

const createStock = asyncHandler ( async (req,res) =>{

    try {
        const {nome,categoria,quantidade,precoCompra,precoVenda} = req.body;

        if(!nome || !categoria || !precoVenda || !precoCompra){

            res.status(400).json({message:'Porfavor, introduza todos os dados'})

        }

        const novoStock = await Stock.create({
            nome,
            categoria,
            quantidade,
            precoCompra,
            precoVenda

        });

        res.status(201).json({message:`Producto criado com sucesso! ${novoStock}`})

    } catch (error) {

        res.status(500).json({ message: 'Erro ao criar um novo Produto', error: err.message });

        console.log(error);
    }
});

const getStock = asyncHandler (async (req,res)=>{

    try {
        const Stock = await Stock.find();

        res.status(200).json(Stock);

    } catch ({error}) {

        res.status(500).json({ message: 'Erro ao listar os Produtos', error: err.message });
        console.log(error);
    }
});

module.exports ={
    createStock,
    getStock,
}
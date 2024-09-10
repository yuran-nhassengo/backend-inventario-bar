const asyncHandler = require ("express-async-handler");

const Stock = require("../model/stock-model");

const mongoose  = require("mongoose");

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
        console.log(error);
    }
})

module.exports ={
    createStock,
}
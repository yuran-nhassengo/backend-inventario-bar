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

        res.status(500).json({ message: 'Erro ao criar um novo Produto', error: err.message });

        console.log(error);
    }
});

const getStock = asyncHandler (async (req,res)=>{

    try {
        const allStock = await Stock.find();

        res.status(200).json(allStock);

    } catch ({error}) {

        res.status(500).json({ message: 'Erro ao listar os Produtos', error: err.message });
        console.log(error);
    }
});

const updateStock = asyncHandler(async (req, res) => {
    const stockId = req.params.id; // Supondo que você esteja passando o ID como parâmetro de URL

    if (!mongoose.Types.ObjectId.isValid(stockId)) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    try {
        const { quantidade } = req.body; // Obtendo o novo valor do atributo quantity

        if (quantidade === undefined) {
            return res.status(400).json({ message: "Atributo quantity não fornecido" });
        }

        const updatedStock = await Stock.findByIdAndUpdate(
            stockId,
            { quantidade }, // Atualizando apenas o atributo quantity
            { new: true, runValidators: true } // new: true retorna o documento atualizado, runValidators aplica as validações
        );

        if (!updatedStock) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        res.status(200).json(updatedStock);
    } catch (error) {
        console.log("update error", error);
        return res.status(500).json({ message: `Internal error ${error.message}` });
    }
});

const updateStockQuantity = asyncHandler(async (produtoId, quantidade) => {
    const stock = await Stock.findOne({ _id: produtoId });
    if (!stock) {
        throw new Error('Produto não encontrado no estoque');
    }
    stock.quantidade += quantidade; // Adiciona a quantidade da entrada ao estoque
    await stock.save();
});

module.exports ={
    createStock,
    getStock,
    updateStock,
    updateStockQuantity,
}
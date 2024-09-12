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

const updateStockAll = asyncHandler(async (req, res) => {
    try {
        const updates = req.body.updates; // Obtendo o array de atualizações

        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ message: "Nenhuma atualização fornecida" });
        }

        // Iterando sobre o array de atualizações e aplicando-as
        const updatePromises = updates.map(async (update) => {
            const { id, quantity } = update;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return { id, error: "ID inválido" };
            }

            try {
                const updatedStock = await Stock.findByIdAndUpdate(
                    id,
                    { quantidade: quantity }, // Atualizando o atributo quantidade
                    { new: true, runValidators: true }
                );

                if (!updatedStock) {
                    return { id, error: "Produto não encontrado" };
                }

                return { id, updatedStock };
            } catch (error) {
                return { id, error: `Erro interno: ${error.message}` };
            }
        });

        // Espera por todas as atualizações e retorna o resultado
        const results = await Promise.all(updatePromises);

        // Filtra e agrupa os resultados
        const successfulUpdates = results.filter(result => result.updatedStock);
        const errors = results.filter(result => result.error);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Algumas atualizações falharam",
                errors: errors
            });
        }

        res.status(200).json({
            message: "Estoque atualizado com sucesso",
            updatedStocks: successfulUpdates
        });

    } catch (error) {
        console.log("update error", error);
        return res.status(500).json({ message: `Erro interno: ${error.message}` });
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
    updateStockAll 
}
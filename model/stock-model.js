const mongoose = require("mongoose");


const stockShema = mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    categoria :{
        type: String,
        require: true,
    },
    quantidade : {
        type: Number,
    require: true,
    },
    precoCompra: {
        type: Number,
        require: true,
    },
    precoVenda: {
        type: Number,
        require: true,
    },
},{
    timestamps:true,
});

const Stock = mongoose.model("Stock",stockShema);

module.exports = Stock;
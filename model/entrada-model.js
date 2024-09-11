const mongoose = require("mongoose");


const entradaShema = mongoose.Schema({

    produtoId:{
        type: String,
        require: true,
    },
    quantidade: {
        type: Number,
        require: true,
    },
})

const Entrada = mongoose.model("Entrada",entradaShema);

module.exports ={
    Entrada,
}
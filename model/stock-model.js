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
    quantidade : { Number,
    require: true,
    },
});

const Stock = mongoose.model("Stock",stockShema);

module.exports = Stock;
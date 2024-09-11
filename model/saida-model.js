const mongoose = require("mongoose")

const saidaShema = mongoose.Schema ({

    productId : {
        type :String,
        require:true,
    },
    quantidade : {
        type:Number,
        require:true,
    },
});

const Saida = mongoose.model("Saida",saidaShema);

module.exports = Saida;
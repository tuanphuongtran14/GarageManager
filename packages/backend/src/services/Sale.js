const { Sale } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    
    // Create repair vote base on input
    let newSale = await new Sale({
        ...input
    });
    await newSale.save();

    return newSale;
}

exports.find = () =>{
    return Sale.find({}).populate('saleDetails');
}

exports.findOne = (id) =>{
    return Sale.findById(id).populate('saleDetails');
}

/* `````````````````````````````````` */

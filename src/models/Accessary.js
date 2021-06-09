exports.initAccessary = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Accessary Schema
    const accessarySchema = new Schema({
        name: String,
        unitPrice: Number,
        remaining: Number
    })

    // Create Accessary Model
    const Accessary = mongoose.model('Accessary', accessarySchema);

    return Accessary;
}
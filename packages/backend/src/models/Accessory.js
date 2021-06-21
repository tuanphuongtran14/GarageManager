exports.initAccessory = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Accessary Schema
    const AccessorySchema = new Schema({
        name: String,
        unitPrice: Number,
        remaining: Number
    })

    // Create Accessary Model
    const Accessory = mongoose.model('Accessory', AccessorySchema);

    return Accessory;
}
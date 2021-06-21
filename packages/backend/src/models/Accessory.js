exports.initAccessory = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Accessory Schema
    const AccessorySchema = new Schema({
        name: String,
        unitPrice: Number,
        remaining: Number
    })

    // Create Accessory Model
    const Accessory = mongoose.model('Accessory', AccessorySchema);

    return Accessory;
}
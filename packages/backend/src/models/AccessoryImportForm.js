exports.initAccessoryImportForm = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Accessory Schema
    const AccessoryImportFormSchema = new Schema({
        number: Number,
        date: { type: Date, default: Date.now},
        accessory: { type: Schema.Types.ObjectId, ref: 'Accessory'}
    })

    // Create Accessory Model
    const AccessoryImportForm = mongoose.model('AccessoryImportForm', AccessoryImportFormSchema);

    return AccessoryImportForm;
}
exports.initBill = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Bill Schema
    const billSchema = new Schema({
        car: {type: Schema.Types.ObjectId, ref: 'Car'},
        collectionDate: Date,
        amount: Number
    })

    // Create Bill Model
    const Bill = mongoose.model('Bill', billSchema);

    return Bill;
}
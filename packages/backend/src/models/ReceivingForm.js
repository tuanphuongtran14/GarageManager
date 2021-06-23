exports.initReceivingForm = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Receving Form Schema
    const ReceivingFormSchema = new Schema({
        car: { type: Schema.Types.ObjectId, ref: 'Car' },
        receivingDate: { type: Date, default: Date.now },
    });

    // Create Receving Form Model
    const ReceivingForm = mongoose.model('ReceivingForm', ReceivingFormSchema);

    return ReceivingForm;
}
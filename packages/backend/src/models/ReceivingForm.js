exports.initReceivingForm = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Receving Form Schema
    const receivingFormSchema = new Schema({
        car: { type: Schema.Types.ObjectId, ref: 'Car' },
        receivingDate: Date
    });

    // Create Receving Form Model
    const ReceivingForm = mongoose.model('ReceivingForm', receivingFormSchema);

    return ReceivingForm;
}
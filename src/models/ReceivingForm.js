exports.initReceivingForm = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Receving Form Schema
    const recevingFormSchema = new Schema({
        car: { type: Schema.Types.ObjectId, ref: 'Car' },
        receivingDate: Date
    });

    // Create Customer Model
    const RecevingForm = mongoose.model('RecevingForm', recevingFormSchema);

    return RecevingForm;
}
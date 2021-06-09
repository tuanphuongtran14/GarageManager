exports.initRepairVoteDetail = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Repair Vote Detail Schema
    const repairVoteDetailSchema = new Schema({
        content: String,
        accessary: { type: Schema.Types.ObjectId, ref: 'Accessary' },
        quantity: Number,
        wage: { type: Schema.Types.ObjectId, ref: 'Wage' },
        price: Number
    });

    // Create Repair Vote Detail Model
    const RepairVoteDetail = mongoose.model('RepairVoteDetail', repairVoteDetailSchema);

    return RepairVoteDetail;
}
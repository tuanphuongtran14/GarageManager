exports.initRepairVote = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Repair Vote Schema
    const repairVoteSchema = new Schema({
        receivingForm: { type: Schema.Types.ObjectId, ref: 'ReceivingForm' },
        details: [{ type: Schema.Types.ObjectId, ref: 'RepairVoteDetail' }],
        repairDate: Date,
        totalPrice: Number
    });

    // Create Repair Vote Model
    const RepairVote = mongoose.model('RepairVote', repairVoteSchema);

    return RepairVote;
}
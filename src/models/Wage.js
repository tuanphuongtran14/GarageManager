exports.initWage = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Wage Schema
    const wageSchema = new Schema({
        name: String,
        price: Number
    })

    // Create Wage Model
    const Wage = mongoose.model('Wage', wageSchema);

    return Wage;
}
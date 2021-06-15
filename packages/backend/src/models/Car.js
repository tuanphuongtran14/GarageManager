exports.initCar = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Car Schema
    const carSchema = new Schema({
        licensePlate: {type: String, unique: true, index: true},
        debt: {type: Number, default: 0},
        carBrand: { type: Schema.Types.ObjectId, ref: 'CarBrand' },
        carOwner: { type: Schema.Types.ObjectId, ref: 'Customer' }
    })

    // Create Car Model
    const Car = mongoose.model('Car', carSchema);

    return Car;
}
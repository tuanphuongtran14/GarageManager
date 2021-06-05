exports.initCustomer = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Customer Schema
    const customerSchema = new Schema({
        name: String,
        phoneNumber: String,
        address: String,
        email: String
    });

    // Create Customer Model
    const Customer = mongoose.model('Customer', customerSchema);

    return Customer;
}
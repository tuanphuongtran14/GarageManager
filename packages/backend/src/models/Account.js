exports.initAccount = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Account Schema
    const AccountSchema = new Schema({
        name: String,
        hashedPassword: String,
        permission: String,
    });

    // Create Account Model
    const Account = mongoose.model('Account', AccountSchema);

    return Account;
}
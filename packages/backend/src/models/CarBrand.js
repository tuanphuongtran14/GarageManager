exports.initCarBrand = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Car Brand Schema
    const carBrandSchema = new Schema({
        name: String
    })

    // Create Car Brand Model
    const CarBrand = mongoose.model('CarBrand', carBrandSchema);

    return CarBrand;
}
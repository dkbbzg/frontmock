const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    "company_name": String,
    "company_logo": String,
    "company_introduction": String,
});

const CompanyModels = mongoose.model('company', CompanySchema, 'companys')

module.exports = CompanyModels
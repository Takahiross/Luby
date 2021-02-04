const { validate } = require('validatorjs');

module.exports = async function idValidator(req, res, next){
    if(!validate(request.params.id)){
        return res.status(400).json({error: 'Id is not in UUID pattern'});
    }

    return next();
}
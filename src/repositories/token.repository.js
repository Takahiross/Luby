const Token = require('../app/models/token.model');

class TokenRepository{
    async createToken(token){
        const created = await Token.create(token);

        return created;
    }
}

module.exports = TokenRepository
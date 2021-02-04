const { v4 } = require('uuid');
const UserRepository = require('../../repositories/user.repository');
const TokenRepository = require('../../repositories/token.repository');
const filterUser = require('../../utils/filteruser.util');

module.exports = {
    execute: async (username) => {
        const userRepository = new UserRepository()
        const tokenRepository = new TokenRepository()

        const user = await userRepository.findOne({ 
            where: {
                username
            }
        })
    
        if(!user) {
            throw new Error('No users was found')
        }

        const token = await tokenRepository.create({
            id: v4(),
            user_id: user.id
        })

        if(!token) {
            throw new Error('Failed to create authentication token')
        }
    
        const filteredUser = filterUser(user)
    
        return filteredUser
    }
}
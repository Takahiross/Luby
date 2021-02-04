const { v4 } = require('uuid');
const { Op } = require('sequelize');
const Validator = require('validatorjs');
const UserRepository = require('../../repositories/user.repository');
const filterUser = require('../../utils/filteruser.util');

module.exports = {
    execute: async ({ name, email, localization, avatar, username, bio }) => {
        const rules = {
            name: 'required|string',
            email: 'required|email',
            localization: 'required|string',
            avatar: 'required|url',
            username: 'required|string',
            bio: 'required|string',
        }
        
        const validator = new Validator({
            name,
            email,
            localization,
            avatar,
            username,
            bio
        }, rules)

        if(validator.fails()) {
            throw new Error('Not all necessary fields provided or fields are not in correct format')
        }
        
        const userRepository = new UserRepository()

        const user = await userRepository.findAnother({ 
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        })
    
        if(user) {
            throw new Error('There\'s aleady an user with this information')
        }
    
        const createdUser = await userRepository.create({
            id: v4(),
            name,
            email,
            localization,
            avatar,
            username: username.split(' ').join('-'),
            bio
        })
    
        const filteredUser = filterUser(createdUser)
    
        return filteredUser
    }
}
const Validator = require('validatorjs');
const { Op } = require('sequelize');

const filterUser = require('../../utils/filteruser.util');
const nullProperties = require('../../utils/nullproperties.util');
const UserRepository = require('../../repositories/user.repository');
const RepositoryRepository = require('../../repositories/repository.repository');


module.exports = {
    execute: async( newProperties, userId) => {
        const userRepository = new UserRepository();

        const filteredNewProperties = nullProperties(newProperties);

        const rules = {
            name: 'string',
            email: 'email',
            localization: 'string',
            avatar: 'url',
            username: 'string',
            biography: 'string',
        }

        const validator = new Validator(filteredNewProperties, rules);

        if(validator.fails()){
            throw new Error('Fields are not in correct format');
        }

        const user = await userRepository.findByPk(userId);

        if(!user){
            throw new Error('No user was found');
        }

        let email = filteredNewProperties.email === undefined ? null : filteredNewProperties.email;
        let username = filteredNewProperties.username === undefined ? null : filteredNewProperties.username.split(' ').join('-');

        const userValidate = await userRepository.findAnother({
            where:{
                [Op.or]:[
                    { email },
                    { username }
                ]
            }
        })

        if(userValidate){
            throw new Error('There\'s alredy an user with this information');
        }

        if(username){
            const repositoryRepository = new RepositoryRepository();

            const repository = await repositoryRepository.findAnother({
                where:{
                    slug:{
                        [Op.like]: `%${user.username}%`
                    }
                }
            })

            if(repository){
                let formerslug = repository.slug.split('/');
                formerslug[formerslug.length - 2] = username;
                await repositoryRepository.update({
                    slug:formerslug.join('/')
                },{
                    where:{
                        slug: {
                            [Op.like]: `%${user.username}%`
                        }
                    }
                })
            }
        }

        if(username){
            filteredNewProperties.username = username;
        }

        await userRepository.username(filteredNewProperties, {
            where:{
                id: userId
            },
            returning: true
        })
        await user.reload();
        const filteredUsers = filterUser(user);

        return filteredUser;
    }
}

const { validate } = require('uuid');
const nullProperties = require('../../utils/nullproperties.util');
const UserRepository = require('../../repositories/user.repository');
const RepositoryRepository = require('../../repositories/repository.repository');
const RepositoryStarsRepository = require('../../repositories/repositorystar.repository');

module.exports = {
    execute: async (newProperties, repositoryStarId) => {
        const userRepository = new UserRepository();
        const repositoryRepository = new RepositoryRepository();
        const repositoryStarsRepository = new RepositoryStarsRepository();
        const filteredNewProperties = nullProperties(newProperties);

        if(filteredNewProperties.userId) {
            if(!validate(filteredNewProperties.userId)) {
                throw new Error('Ids are not in UUID pattern');
            }

            const user = await userRepository.findByPk(filteredNewProperties.userId);

            if(!user) {
                throw new Error('Id did not match existing users');
            }
        }
        
        if(filteredNewProperties.repositoryId) {
            if(!validate(filteredNewProperties.repositoryId)) {
                throw new Error('Ids are not in UUID pattern');
            }

            const repository = await repositoryRepository.findByPk(filteredNewProperties.repositoryId);

            if(!repository) {
                throw new Error('Id did not match existing repository');
            }
        }

        const validateUserStar = await repositoryStarsRepository.findOne({
            where: {
                user_id: filteredNewProperties.userId,
                repository_id: filteredNewProperties.repositoryId
            }
        })

        if(validateUserStar) {
            throw new Error('The user already starred the repository');
        }

        const repositoryStar = await repositoryStarsRepository.findByPk(repositoryStarId);
    
        await repositoryStarsRepository.update(
            {
                user_id: filteredNewProperties.userId,
                repository_id: filteredNewProperties.repositoryId
            },
            {
                where: {
                    id: repositoryStarId
                },
                returning: true  
            }
        )
    
        await repositoryStar.reload();
    
        return repositoryStar;
    }
}
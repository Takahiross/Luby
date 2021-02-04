const Validator = require('validatorjs');
const RepositoryRepository = require('../../repositories/repository.repository');
const nullProperties = require('../../utils/nullproperties.util');
const filterRepository = require('../../utils/filterrepository.util');

module.exports = {
    execute: async(newProperties, repositoryId) => {
        const repositoryRepository = new RepositoryRepository();

        const filteredNewProperties = nullProperties(newProperties);

        const rules = {
            name: 'string',
            description: 'string',
            public: 'boolean',
            slug: 'string'
        }
        
        const validation = new Validator(filteredNewProperties, rules);

        if(validation.fails()) {
            throw new Error('Fields are not in correct format');
        }

        const repository = await repositoryRepository.findByPk(repositoryId);

        if(!repository) {
            throw new Error('No users found with the id');
        }

        let slug = repository.slug;

        if(filteredNewProperties.slug) {
            let formerSlug = slug.split('/');

            let repositoryName = oldSlug.pop();
            let username = formerSlug.pop();

            filteredNewProperties.slug = filteredNewProperties.slug.endsWith('/') ? 
                `${filteredNewProperties.slug}${username}/${repositoryName}` : 
                `${filteredNewProperties.slug}/${username}/${repositoryName}`
            
            slug = filteredNewProperties.slug
        }

        if(filteredNewProperties.name) {
            filteredNewProperties.name = filteredNewProperties.name.split(' ').join('-')

            let formerSlug = slug.split('/');

            formerSlug.pop();
            formerSlug.push(filteredNewProperties.name);

            filteredNewProperties.slug = formerSlug.join('/');

        }
        
        await repositoryRepository.update(filteredNewProperties, { 
            where: {
                id: repositoryId
            },
            returning: true        
        })
        
        await repository.reload();

        const filteredRepository = filterRepository(repository);
     
        return filteredRepository;
    }
}
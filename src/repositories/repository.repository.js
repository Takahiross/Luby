const Repository = require('../app/models/repository.model');
const filterRepository = require('../utils/filterrepository.util');

const { Op } = require('sequelize');

class RepositoryRepository{
    async findRepository(){
        try{
            const repositories = await Repository.findAndCountAll();

            const filteredRepositories = {
                data: repositories.rows.map(repository => filterRepository(repository)),
                count: repositories.count
            }
            return filteredRepositories;
        } catch(error){
            throw new Error('Failed to find repository');
        }
    }


    async fndRepositoriesByUsername(username){
        try{
            const repositories = await Repository.findAll({
                where: {
                    slug: {
                        [Op.like]: `%${username}%`
                    }
                },
                include: [{
                    association: 'repositories_stars'
                }]
            })

            const filteredRepositories = repositories.map(repository =>({
                id: repository.id,
                name: repository.name,
                description: repository.description,
                public: repository.public,
                slug: repository.slug,
                stars: repository.stars,
            }))

            return filteredRepositories;
        }catch(error){
            throw new Error('There no repositoryfound with the provider username');
        }
    }

    async deleteRepository(repositoryId){
        try{
            const repository = await Repository.findByPk(repositoryId);

            if(!repository){
                throw new Error('There no repositoryfound with the provider username');
            }

            const status = await Repository.destroy({
                where:{
                    id: repositoryId
                }
            })

            if(status !== 1){
                throw new Error('Failed to delete repository');
            }

            return repository;
        }catch(error){
            throw new Error('There no repository found with the provider id');
        }
    }


    async createRepository(repository){
        const created = await Repository.create(repository);
        return created;
    }

    async updateRepository(properties, options){
        await Repository.update(properties, options);
    }

    async findByPk(id){
        const repository = await Repository.findByPk(id);
        return repository;
    }
}

module.exports = RepositoryRepository
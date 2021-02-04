const RepositoryStar = require('../app/models/repositorystars.model');

class RepositoryStars{
    async findRepositoriesStars(){
        try{
            const repositoriesStar = await RepositoryStar.findAndCountAll();

            const filteredRepositoriesStars = {
                data: repositoriesStar.rows,
                count: repositoriesStar.count
            }
            return filteredRepositoriesStars;
        }catch(error){
            throw new Error('Failed to find repositories stars')
        }
    }

    async findRepositoryStarsByRepositoryId(repositoryId){
        try{
            const repositoriesStar = await RepositoryStar.findAndCountAll({
                where: {
                    repository_id: repositoryId
                }
            })

            if(!repositoriesStar){
                throw new Error('There no repository stars found with the provider id');
            }

            const filteredRepositoriesStars = {
                data: repositoriesStar.rows,
                count: repositoriesStar.count
            }

            return filteredRepositoriesStars;
        }catch(error){
            throw new Error('There no repository stars found with the provider id');
        }
    }

    async deleteRepositoryStars(repositoryId){
        try{
            const repository = await RepositoryStar.findAndCountAll(repositoryId);

            if(!repository){
                throw new Error('There no repository stars found with the provider id');
            }

            const status = await RepositoryStar.destroy({
                where:{
                    id: repositoryId
                }
            })

            if(status !== 1){
                throw new Error('Failed to delete repository');
            }
            return repository;
        }catch(error){
            throw new Error('There no repository stars found with the provider id');
        }
    }

    async createRepositoryStars(repositoryStar){
        const created = await RepositoryStar.create(repositoryStar);
        return created;
    }

    async updateRepositoryStar(properties, options){
        await RepositoryStar.update(properties, options);
    }

    async findByPk(id){
        const repository = await RepositoryStar.findByPk(id);
        return repository;
    }

}

module.exports = RepositoryStars
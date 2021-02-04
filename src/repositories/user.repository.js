const User = require('../app/models/user.model');
const filterUser = require('../utils/filteruser.util');
const RepositoryRepository = require('../repositories/repository.repository');

class UserRepository{
    async findUsers(){
        try{
            const users = await User.findAndCountAll()

            const filteredUsers = {
                data: users.rows.map(user => filterUser(user)),
                count: users.count
            }
            return filteredUsers
        } catch(error){
            throw new Error('Failed to find users')
        }
    }


    async findUserById(userId){
        try{
            const repositoryRepository = new RepositoryRepository()

            const user = await User.findByPk(userId, {
                include: [
                    {
                        association: 'followers',
                    },
                    {
                        association: 'followings',
                    }
                ]
            })

            const repositories = await repositoryRepository.findRepositoriesByUsername(user.username)

            const { id, name, email, localization, avatar, username, biography, followers, followings} = user

            const followersIds = followers.map(follower => follower_id)
            const followingsIds = followings.map(followings => following_id)

            const filteredFollowers = await User.findAll({
                where: {
                    id: followersIds
                }
            })

            const filteredFollowings = await User.findAll({
                where: {
                    id: followingsIds
                }
            })

            return{ id, name, email, localization, avatar, username, biography,
                followers:{
                    data: filteredFollowers.map(follower =>({
                        id: follower.id,
                        username: follower.username,
                        avatar: follower.avatar,
                    })),
                    count: filteredFollowers.length
                },
                following: {
                    data: filteredFollowings.map(following => ({
                        id: following.id,
                        username: following.username,
                        avatar: following.avatar,
                    })),
                    count: filteredFollowings.length
                },
                repositories: {
                    data: repositories,
                    count: repositories.length
                }
            }
        } catch(error){
            throw new Error('There no users found with the provider id')
        }
    }

    
    async deleteUser(userId){
        const user = new User.findByPk(userId)

        if(!user){
            throw new Error('There no users found with the provider id')
        }

        const status = await User.destroy({
            where:{
                id: userId
            }
        })

        if(status !== 1){
            throw new Error('Failed to delete user')
        }
        return user
    }


    async createUser(user){
        const created = await User.create(user)

        return created
    }

    async update(properties, options){
        await User.update(properties, options)
    }

    async findByPk(id){
        const user = await User.findByPk(id)

        return user
    }
    
    async findAnother(options) {
       const user = await User.findAnother(options)

       return user
    }
}


module.exports = UserRepository

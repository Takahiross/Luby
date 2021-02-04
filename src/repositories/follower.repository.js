const Follower = require('../app/models/follower.model');
const filterUser = require('../utils/filteruser.util');

class FollowerRepository{
    async findFollowers(){
        try{
            const followers = await Follower.findAll();

            return followers;
        }catch(error){
            throw new Error('Failed to find followers');
        }
    }

    async findFollowersByUserId(userId){
        try{
            const followers = await Follower.findAndCountAll({
                where:{
                    user_id: userId
                },
                include:{
                    association: 'follower'
                }
            })

            const filteredFollowers = {
                data: followers.rows.map(Follower => ({
                    id: followers.id,
                    user_id: followers.user_id,
                    follower_id: followers.follower_id,
                })),
                count: followers.count
            }    
            return filteredFollowers;
        }catch(error){
            throw new Error('Failed to find followers');
        }
    }

    async deleteFollowers(followersId){
        const follower = await Follower.findByPk(followersId);

        if(!follower){
            throw new Error('There no followers found with the id');
        }

        const status = await Follower.destroy({
            where:{
                id: followersId
            }
        })

        if(status !== 1){
            throw new Error('Failed to delete followers');
        }

        return follower;
    }

    async createFollower(follower){
        const created = await Follower.create(follower);
        return created;
    }

    async updateFollower(properties, options){
        await Follower.update(properties, options);
    }

    async findByPk(id){
        const follower = Follower.findByPk(id);
        return follower;
    }
}

module.exports = FollowerRepository
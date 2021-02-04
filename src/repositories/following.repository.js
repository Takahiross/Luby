const Following = require('../app/models/following.model');
const filterUser = require('../utils/filteruser.util');

class FollowingRepository{
    async findFollowings(){
        try{
            const followings = await Following.findAndCountAll();

            return followings;
        }catch(error){
            throw new Error('Failed to find followings');
        }
    }

    async findFollowingsByUserId(userId){
        try{
            const followings = await Following.findAndCountAll({
                where:{
                    user_id: userId
                },
                include:{
                    association: 'following'
                }
            })

            const filteredFollowings = {
                data: followings.rows.map( following => ({
                    id: following.id,
                    user_id: following.user_id,
                    following_id: following.following_id,
                    following_data: filterUser(following.following)
                })),
                count: followings.count
            }
            return filteredFollowings;
        }catch(error){
            throw new Error('Failed to find followings with the id');
        }
    }

    async deleteFollowings(followingsId){
        const following = await Following.findByPk(followingsId);

        if(!following){
            throw new Error('There no followings found with the id');
        }

        const status = await Following.destroy({
            where:{
                id: followingsId
            }
        })

        if(status !== 1){
            throw new Error('Failed to delete following');
        }

        return following
    }

    async createFollowings(following){
        const created = await Following.create(following);
        return created;
    }

    async updateFollowings(properties, options){
        await Following.update(properties, options);
    }

    async findByPk(id){
        const following = await Following.findByPk(id);
        return following;
    }
}

module.exports = FollowingRepository
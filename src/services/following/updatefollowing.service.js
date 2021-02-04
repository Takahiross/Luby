const nullProperties = require('../../utils/nullproperties.util');
const FollowingRepository = require('../../repositories/following.repository');
const UserRepository = require('../../repositories/user.repository');
const { validate } = require('uuid');

module.exports = {
    execute: async (newProperties, followingsId) => {
        const followingRepository = new FollowingRepository();
        const userRepository = new UserRepository();

        const filteredNewProperties = nullProperties(newProperties);

        if(filteredNewProperties.userId) {
            if(!validate(filteredNewProperties.userId)) {
                throw new Error('Ids are not in UUID pattern');
            }

            const user = await userRepository.findByPk(filteredNewProperties.userId);

            if(!user) {
                throw new Error('Ids did not match existing users');
            }
        }
        
        if(filteredNewProperties.followingId) {
            if(!validate(filteredNewProperties.followingId)) {
                throw new Error('Ids are not in UUID pattern');
            }

            const user = await userRepository.findByPk(filteredNewProperties.followingId);

            if(!user) {
                throw new Error('Ids did not match existing users');
            }
        }

        const following = await followingRepository.findByPk(followingsId);

        if(!following) {
            throw new Error('Ids provided did not match existing followings');
        }

        await followingRepository.update(
            {
                user_id: filteredNewProperties.userId,
                follower_id: filteredNewProperties.followingId
            },
            { 
                where: {
                    id: followingsId
                },
                returning: true        
            }
        )
        
        await following.reload();

        return following;
    }
}
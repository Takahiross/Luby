const nullProperties = require('../../utils/nullproperties.util');
const FollowerRepository = require('../../repositories/follower.repository');
const UserRepository = require('../../repositories/user.repository');
const { validate } = require('uuid');

module.exports = {
    execute: async (newProperties, followersId) => {
        const followerRepository = new FollowerRepository();
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
        
        if(filteredNewProperties.followerId) {
            if(!validate(filteredNewProperties.followerId)) {
                throw new Error('Ids are not in UUID pattern');
            }

            const user = await userRepository.findByPk(filteredNewProperties.followerId);

            if(!user) {
                throw new Error('Ids did not match existing users');
            }
        }

        const follower = await followerRepository.findByPk(followersId);

        if(!follower) {
            throw new Error('Ids did not match existing followers');
        }

        await followerRepository.update(
            {
                user_id: filteredNewProperties.userId,
                follower_id: filteredNewProperties.followerId
            },
            { 
                where: {
                    id: followersId
                },
                returning: true        
            }
        )
        
        await follower.reload();

        return follower;
    }
}
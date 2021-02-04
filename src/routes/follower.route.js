const { Router } = require('express');
const FollowerRepository = require('../repositories/follower.repository');
const createFollowerService = require('../services/follower/createfollower.service');
const updateFollowerService = require('../services/follower/updatefollower.service');
const idValidation = require('../middlewares/idvalidation.middlewares');

const followerRepository = new FollowerRepository()

const followersRouter = Router();

followersRouter.get('/', async (req, res) => {
    try {
        const followers = await followerRepository.findFollowers();

        return res.status(200).json(followers);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followersRouter.get('/:id', idValidation, async (req, res) => {
    try {
        const followers = await followerRepository.findFollowersByUserId(req.params.id);

        return res.status(200).json(followers);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followersRouter.post('/', async (req, res) => {
    try {
        const {
            userId,
            followerId
        } = req.body

        const follower = await createFollowerService.execute({
            userId,
            followerId
        })

        return res.status(201).json(follower);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followersRouter.put('/:id', idValidation, async (req, res) => {
    try {
        const {
            userId,
            followerId
        } = req.body

        const follower = await updateFollowerService.execute({
            userId,
            followerId
        }, req.params.id)

        return res.status(200).json(follower);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followersRouter.delete('/:id', idValidation, async (req, res) => {
    try {
        const follower = await followerRepository.destroy(req.params.id);

        return res.status(200).json(follower);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

module.exports = followersRouter
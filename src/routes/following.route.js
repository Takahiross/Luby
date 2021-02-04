const { Router } = require('express');
const idValidation = require('../middlewares/idvalidation.middlewares');
const FollowingRepository = require('../repositories/following.repository');
const createFollowingService = require('../services/following/createfollowing.service');
const updateFollowingService = require('../services/following/updatefollowing.service');

const followingRepository = new FollowingRepository();

const followingsRouter = Router();

followingsRouter.get('/', async (req, res) => {
    try {
        const followings = await followingRepository.findFollowings();

        return res.status(200).json(followings);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followingsRouter.get('/:id', idValidation, async (req, res) => {
    try {
        const followings = await followingRepository.findFollowingsByUserId(req.params.id);

        return res.status(200).json(followings);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followingsRouter.post('/', async (req, res) => {
    try {
        const {
            userId,
            followingId
        } = req.body

        const following = await createFollowingService.execute({
            userId,
            followingId
        })

        return res.status(201).json(following);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followingsRouter.put('/:id', idValidation, async (req, res) => {
    try {
        const {
            userId,
            followingId
        } = req.body

        const following = await updateFollowingService.execute({
            userId,
            followingId
        }, req.params.id)

        return res.status(200).json(following);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

followingsRouter.delete('/:id', idValidation, async (req, res) => {
    try {
        const following = await followingRepository.destroy(req.params.id);

        return res.status(200).json(following);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

module.exports = followingsRouter
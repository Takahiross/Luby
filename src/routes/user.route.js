const { Router } = require('express');
const UserRepository = require('../repositories/user.repository');
const createUserService = require('../services/users/createuser.service');
const updateUserService = require('../services/users/updateuser.service');
const authenticateUserService = require('../services/users/authenticateuser.service');
const idValidation = require('../middlewares/idvalidation.middlewares');

const usersRouter = Router();

const userRepository = new UserRepository();

usersRouter.get('/', async (req, res) => {
    try {
        const users = await userRepository.findUsers();

        return res.status(200).json(users);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

usersRouter.get('/:id', idValidation, async (req, res) => {
    try {
        const user = await userRepository.findUserById(req.params.id);

        return res.status(200).json(user);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

usersRouter.post('/', async (req, res) => {
    try {
        const {
            name,
            email,
            localization,
            avatar,
            username,
            bio
        } = req.body

        const user = await createUserService.execute({
            name,
            email,
            localization,
            avatar,
            username,
            bio
        })

        return res.status(201).json(user);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

usersRouter.put('/:id', idValidation, async (req, res) => {
    try {
        const {
            name,
            email,
            localization,
            avatar,
            username,
            bio
        } = req.body

        const user = await updateUserService.execute({
            name,
            email,
            localization,
            avatar,
            username,
            bio
        }, req.params.id)

        return res.status(200).json(user);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

usersRouter.delete('/:id', idValidation, async (req, res) => {
    try {
        const user = await userRepository.deleteUser(req.params.id);

        return res.status(200).json(user);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

usersRouter.get('/auth/:username', async (req, res) => {
    try {
        const user = await authenticateUserService.execute(req.params.username);

        return res.status(200).json(user);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

module.exports = usersRouter
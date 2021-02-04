const { Router } = require('express');
const idValidation = require('../middlewares/idvalidation.middlewares');
const RepositoryRepository = require('../repositories/repository.repository');
const createRepositoryService = require('../services/repository/createrepository.service');
const updateRepositoryService = require('../services/repository/updaterepository.service');
const repositoriesRouter = Router();
const repositoryRepository = new RepositoryRepository();

repositoriesRouter.get('/', async (req, res) => {
    try {
        const repositories = await repositoryRepository.findRepositories();

        return res.status(200).json(repositories);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesRouter.get('/:username', async (req, res) => {
    try {
        const repositories = await repositoryRepository.findRepositoriesByUsername(req.params.username);

        return res.status(200).json(repositories);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesRouter.post('/', async (req, res) => {
    try {
        const {
            name,
            description,
            public,
            username,
            slug
        } = req.body

        const repository = await createRepositoryService.execute({
            name,
            description,
            public,
            username,
            slug
        })

        return res.status(201).json(repository);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesRouter.put('/:id', idValidation, async (req, res) => {
    try {
        const {
            name,
            description,
            public,
            slug
        } = req.body

        const repository = await updateRepositoryService.execute({
            name,
            description,
            public,
            slug
        }, req.params.id)

        return res.status(200).json(repository);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesRouter.delete('/:id', idValidation, async (req, res) => {
    try {
        const repository = await repositoryRepository.deleteRepository(req.params.id);

        return res.status(200).json(repository);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

module.exports = repositoriesRouter
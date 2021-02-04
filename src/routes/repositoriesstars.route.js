const { Router } = require('express');
const createRepositoryStarService = require('../services/repositoriesstars/createrepositorystar.service');
const updateRepositoryStarService = require('../services/repositoriesstars/updaterepositorystar.service');
const RespositoresStarsRepository = require('../repositories/repositorystar.repository');
const idValidation = require('../middlewares/idvalidation.middlewares');
const repositoriesStarsRouter = Router();
const repositoriesStarsRepository = new RespositoresStarsRepository();

repositoriesStarsRouter.get('/', async (req, res) => {
    try {
        const repositoriesStars = await repositoriesStarsRepository.findRepositoriesStars();

        return res.status(200).json(repositoriesStars);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesStarsRouter.get('/:id', idValidation, async (req, res) => {
    try {
        const repositoriesStars = await repositoriesStarsRepository.findRepositoryStarsByRepositoryId(req.params.id);

        return res.status(200).json(repositoriesStars);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesStarsRouter.post('/', async (req, res) => {
    try {
        const {
            userId,
            repositoryId
        } = req.body

        const repositoryStar = await createRepositoryStarService.execute({
            userId,
            repositoryId
        })

        return res.status(200).json(repositoryStar);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesStarsRouter.put('/:id', idValidation, async (req, res) => {
    try {
        const {
            userId,
            repositoryId
        } = req.body

        const repositoryStar = await updateRepositoryStarService.execute({
            userId,
            repositoryId
        }, req.params.id)

        return res.status(200).json(repositoryStar);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

repositoriesStarsRouter.delete('/:id', idValidation, async (req, res) => {
    try {
        const repositoryStar = await repositoriesStarsRepository.deleteRepositoryStars(req.params.id);

        return res.status(200).json(repositoryStar);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
})

module.exports = repositoriesStarsRouter
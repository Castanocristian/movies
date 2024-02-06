const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Actor.findAll({ include:Genre });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Actor.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => { 
    const { id } = req.params;
    const result = await Actor.findByPk(id, { include:Genre });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Actor.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actor.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenres = catchError(async(req,res)=>{
    // buscamos el actor
    const {id} =req.params
    const actor = await actor.findByPk(id)

    // si no encontramos el actor 
    if(!actor) return res.sendStatus(404)

    // seteamos los genres
    await actor.setGenres(req.body)

    // leer los genereos seteados para devolverlos
    const genres =await actor.getGenres()
    
    return res.json(genres)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres
}
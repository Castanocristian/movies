const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");

Genre.belongsToMany(Actor,{through: 'genreActor'})
Actor.belongsToMany(Genre,{through: 'genreActor'})

// Directors-> actorId

Director.belongsTo(Actor)
Actor.hasMany(Director)
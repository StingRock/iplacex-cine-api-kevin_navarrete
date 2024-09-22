import express, { Router } from 'express'
import actorController from './actorController.js'

const ActorRoutes = express.Router()

ActorRoutes.post('/actor', actorController.handleInsertActorRequest)
ActorRoutes.get('/actores', actorController.handleGetActoresRequest)
ActorRoutes.get('/actor/:id', actorController.handleGetActorByIdRequest)
ActorRoutes.get('/actor/:pelicula', actorController.handleGetActoresByPeliculaIdRequest)

export default ActorRoutes
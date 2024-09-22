import express, { Router } from 'express'
import peliculaCollection from './peliculaController.js'

const peliculaRoutes = express.Router()

peliculaRoutes.post('/pelicula', peliculaCollection.handleInsertPeliculaRequest)
peliculaRoutes.get('/peliculas', peliculaCollection.handleGetPeliculasRequest)
peliculaRoutes.get('/pelicula/:id', peliculaCollection.handleGetPeliculaByIdRequest)
peliculaRoutes.put('/pelicula/:id', peliculaCollection.handleUpdatePeliculaByIdRequest)
peliculaRoutes.delete('/pelicula/:id', peliculaCollection.handleDeletePeliculaByIdRequest)

export default peliculaRoutes
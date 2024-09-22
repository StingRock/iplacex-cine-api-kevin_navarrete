import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js";
import { Pelicula } from "../pelicula/pelicula.js";
import peliculaController from "../pelicula/peliculaController.js";

const actorCollection = client.db('cine-db').collection('actores')

async function handleInsertActorRequest(req, res) {

    try {
    let data = req.body

    const pelicula = await Pelicula.findOne({ id: data.idPelicula })
    if (!pelicula) {
      return res.status(400).send('El Id de la pelicula ingresada no existe')

    }

    let actor = Actor

    actor.idPelicula = data.idPelicula
    actor.nombre = data.nombre
    actor.edad = data.edad
    actor.estaRetirado = data.estaRetirado
    actor.premios = data.premios

    const resultado = await actorCollection.insertOne(actor)

    if (!resultado) {
      return res.status(400).send('Error al guardar los datos del actor')
    }

    return res.status(201).send(actor)
    
  }catch(e) {
    console.error('Error al insertar actor:', e)
    return res.status(500).send({ error: e.message })
  }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({ error: e }) })
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString({ _id: oid })
        .then((data) => {
            if(data === null) return res.status(404).send(data)

            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({ error: e.code })
        })
    }catch(e){
        return res.status(400).send('Id erróreo!')
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    try {
        const { idPelicula } = req.params
    
        if (!ObjectId.isValid(idPelicula)) {
          return res.status(400).send('El Id de la pelicula buscada no existe!')
        }
    
        const peliculaId = new ObjectId(idPelicula)
    
        const actores = await actorCollection.find({ idPelicula: peliculaId }).toArray()
    
        if (actores.length === 0) {
          return res.status(404).send('No se encontro ningún actor con el Id de pelicula ingresado!')
        }
    
        return res.status(200).send(actores)
        
      } catch (e) {
        console.error('Error al obtener actores:', e)
        return res.status(500).send({ error: e.message })
      }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}
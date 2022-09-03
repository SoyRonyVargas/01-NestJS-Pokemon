import { ObjectId } from "mongodb"

export type GetPokemonQuery = {
    id?: ObjectId
    name?: string
    no?: number
}
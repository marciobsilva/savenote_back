const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class NotesController {
    async index(req, res) {
        const { title, tags } = req.query
        const user_id = req.user_id

        const notesQuery = knex("notes")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id",
            ])
            .innerJoin("tags", "tags.note_id", "notes.id")
            .orderBy("notes.title")
            .groupBy("notes.id")
            
        const tagsQuery = knex("tags")

        if(user_id){
            notesQuery.where("notes.user_id", user_id )
            tagsQuery.where({ user_id })
        } 

        if(title)
            notesQuery.whereLike("notes.title", `%${title}%`)

        if(tags) {
            const filterTags = tags.split(',').map( map => map )
            notesQuery.whereIn("name", filterTags)
        }

        const notes = await notesQuery;
        const tagsResult = await tagsQuery;

        const notesWithTags = notes.map( note => {
            const tagsInNote = tagsResult.filter( tag => tag.note_id === note.id)
            return {
                ...note,
                tagsInNote
            }
        })

        return res.json(notesWithTags)
    }

    async create(req, res) {
        const { title, description, tags, links } = req.body
        const user_id  = req.user_id

        const [ note_id ] = await knex("notes").insert({title, description, user_id})

        const linksInsert = links.map( link => {
            return {
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert)

        const tagsInsert = tags.map( name => {
            return {
                name,
                user_id,
                note_id,
            }
        })

        await knex("tags").insert(tagsInsert)

        return res.status(201).json()
    }

    async show(req, res) {
        const { id } = req.params

        const note = await knex("notes").where({ id }).first()

        if(!note) 
            throw new AppError("Nota não encontrada")

        const tags = await knex("tags").where({ note_id: id}).orderBy("name")
        const links = await knex("links").where({ note_id: id}).orderBy("created_at")

        return res.json({...note, tags, links})
    }

    async update(req, res) {
        // Atualizar nota com title, description
        // Interessante remover/adicionar tags e links
    }

    async delete(req, res) {
        const { id } = req.params

        await knex("notes").where({id}).delete()

        return res.json()
    }
}

module.exports = NotesController
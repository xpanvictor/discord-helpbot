import { Client, ThreadChannel } from 'discord.js'
import express from 'express'

export function createRestApi(client: Client) {
    const app = express()
    app.use(express.json())

    const check = (item: any, res: any) => {
        if (!item) return res.status(400).send("Missing "+item)
    }

    app.get("/messages", async (req, res) => {
        const {threadId} = req.query
        check(threadId, res)
        const thread = await client.channels.fetch(threadId as string) as ThreadChannel
        if (!thread) return res.status(404).send("Thread with this id was not found")
        const messages = await thread.messages.fetch()
        return res.status(200).send(JSON.stringify(messages || []))
    })

    app.post("/message", async (req, res) => {
        const {threadId, text} = req.body
        check(threadId, res)
        check(text, res)
        const thread = await client.channels.fetch(threadId as string) as ThreadChannel
        if (!thread) return res.status(404).send("Thread with this id was not found")
        await thread.send(text)
        return res.status(400).send('Message sent')
    })

    app.post('/resolve', async (req, res) => {
        const {threadId} = req.body
        check(threadId, res)
        const thread = await client.channels.fetch(threadId as string) as ThreadChannel
        if (!thread) return res.status(404).send("Thread with this id was not found")
        await thread.send("This conversation is marked resolved and thread will be archived now")
        await thread.setArchived(true)
        return res.status(400).send('Thread resolved')
    })

    return app
}
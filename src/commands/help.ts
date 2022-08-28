import { ChannelType, Client } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction } from "discord.js"
import { createTicket } from "../firebase"

export const data = new SlashCommandBuilder()
                    .setName('help')
                    .setDescription('Create a new help ticket.')
                    .addStringOption(option => option
                        .setName('description')
                        .setDescription('Describe your problem')
                        .setRequired(true)
)

export async function execute(interaction: CommandInteraction, client: Client) {
    if (!interaction.channelId) {
        return
    }
    const channel = await client.channels.fetch(interaction.channelId)
    if (!channel || channel.type !== ChannelType.GuildText){
        return
    }
    const thread = await channel.threads.create({
        name: `support-${Date.now()}`,
        reason: `Support ticket ${Date.now()}`
    })
    const problemDescription = interaction.options.get("description", true)
    const { user } = interaction
    thread.send(`
    **User:**< ${user}>
    **Problem: **${problemDescription.value}
    `)

    await createTicket(thread.id, problemDescription.value)

    return interaction.reply({
        content: 'Help is on the way!',
        ephemeral: true
    })
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const firebase_1 = require("../firebase");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('help')
    .setDescription('Create a new help ticket.')
    .addStringOption(option => option
    .setName('description')
    .setDescription('Describe your problem')
    .setRequired(true));
function execute(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!interaction.channelId) {
            return;
        }
        const channel = yield client.channels.fetch(interaction.channelId);
        if (!channel || channel.type !== discord_js_1.ChannelType.GuildText) {
            return;
        }
        const thread = yield channel.threads.create({
            name: `support-${Date.now()}`,
            reason: `Support ticket ${Date.now()}`
        });
        const problemDescription = interaction.options.get("description", true);
        const { user } = interaction;
        thread.send(`
    **User:**< ${user}>
    **Problem: **${problemDescription.value}
    `);
        yield (0, firebase_1.createTicket)(thread.id, problemDescription.value);
        return interaction.reply({
            content: 'Help is on the way!',
            ephemeral: true
        });
    });
}
exports.execute = execute;

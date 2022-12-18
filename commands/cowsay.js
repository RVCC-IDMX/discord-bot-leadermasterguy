const cowsay = require('cowsay');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Makes a cow message.'),
  async execute(interaction) {
    const cow = cowsay.say({
      text: 'Moo',
    }).replaceAll('`', "'");
    await interaction.reply(`\`\`\`${cow}\`\`\``);
  },
};

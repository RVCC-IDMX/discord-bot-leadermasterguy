const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder,
} = require('discord.js');

const embed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('Guide')
  .setURL('https://discord.js.org')
  .setDescription('Guide with buttons');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Replies with a guide!'),
  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Click Here!')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setLabel('Github Repo')
          .setURL('https://github.com/RVCC-IDMX/discord-bot-leadermasterguy')
          .setStyle(ButtonStyle.Link),
      );

    await interaction.reply({ content: 'I think you should,', components: [row], embeds: [embed] });
  },
};

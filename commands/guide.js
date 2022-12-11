const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder,
} = require('discord.js');

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

    await interaction.reply({ content: 'Click on the link below to open the guide!', components: [row] });
  },
};

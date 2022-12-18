const cowsay = require('cowsay');
const { SlashCommandBuilder } = require('discord.js');

function getCows(error, cowNames) {
  if (error) {
    console.log(error);
  } else if (cowNames) {
    // console.log(`Number of cows available: ${cowNames.length}`);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Makes a cow message.')
    .addStringOption((option) => option.setName('message')
      .setDescription('Contents of the cow message')
      .setMaxLength(200)
      .setRequired(true))
    .addStringOption((option) => option.setName('type')
      .setDescription("Type of 'cow'")
      .setMaxLength(25)
      .setRequired(false)),
  async execute(interaction) {
    const cowMessage = interaction.options.getString('message');
    let cowType = interaction.options.getString('type');
    const cowList = await cowsay.list(getCows);
    // console.log(cowType);
    // console.log(`${cowType}.cow`);
    // console.log(cowList);
    if (cowType === null) {
      cowType = 'fat-cow';
    }
    if (cowList.includes(`${cowType}.cow`)) {
      const cow = cowsay.say({
        text: cowMessage,
        f: cowType,
      }).replaceAll('`', "'");
      // ensures total character length <2000 (reply formatting adds 6 characters)
      if (cow.length < 1994) {
        await interaction.reply(`\`\`\`${cow}\`\`\``);
      } else {
        await interaction.reply('Your Message Exceeded The Character Limit!');
      }
    } else {
      await interaction.reply('Invalid Cow Type!');
    }
  },
};

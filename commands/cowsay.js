const cowsay = require('cowsay');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Makes a cow message.')
    .addStringOption((option) => option.setName('message')
      .setDescription('Contents of the cow message')
      .setMaxLength(25)
      .setRequired(true))
    // unsure if message could be made optional? tried messing with it and couldn't get it to work
    .addStringOption((option) => option.setName('type')
      .setDescription("Type of 'cow'")
      .setMaxLength(25)
      .setRequired(false)),
  async execute(interaction) {
    const cowMessage = interaction.options.getString('message');
    const cowType = interaction.options.getString('type');
    const cowList = await cowsay.list((error, cowNames) => {
      if (error) {
        console.log(error);
      } else if (cowNames) {
        console.log(`Number of cows available: ${cowNames.length}`);
      }
    });
    // console.log(cowType);
    // console.log(`${cowType}.cow`);
    // console.log(cowList);
    if (cowList.includes(`${cowType}.cow`)) {
      const cow = cowsay.say({
        text: cowMessage,
        f: cowType,
      }).replaceAll('`', "'");
      console.log(cowsay.list());
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

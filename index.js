const fs = require('node:fs');
const path = require('node:path');
const {
  Client, Collection, Events, GatewayIntentBits,
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

// eslint-disable-next-line no-restricted-syntax
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log('Ready!');
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isButton()) return;
  const filter = (i) => i.customId === 'primary' && i.user.id === '122157285790187530';

  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', async (i) => {
    await i.update({ content: 'A button was clicked!', components: [] });
  });
  collector.on('collect', async (i) => {
    if (i.customId === 'primary') {
      await i.deferUpdate();
      await wait(4000);
      await i.editReply({ content: 'A button was clicked!', components: [] });
    }
  });
  collector.on('end', (collected) => console.log(`Collected ${collected.size} items`));
});

client.login(token);

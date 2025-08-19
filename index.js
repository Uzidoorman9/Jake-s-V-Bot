require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register slash command
const commands = [
  new SlashCommandBuilder()
    .setName('wack')
    .setDescription('Makes the bot say "Ow! what was that for {username}"')
].map(command => command.toJSON());

const CLIENT_ID = 'your_bot_client_id';
const GUILD_ID = 'your_test_guild_id'; // Use your server ID for testing

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'wack') {
    await interaction.reply(`Ow! what was that for ${interaction.user.username}`);
  }
});

client.login(process.env.DISCORD_TOKEN);

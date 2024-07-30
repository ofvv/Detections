module.exports = async (client) => {
  client.handleAlt = async function(member) {
    if (client.config.guild.ids.includes(member.guild.id) && !client.config.settings.alt.bypass.includes(member.user.id) && !client.config.bot.owners.includes(member.user.id)) {
      if (!client.config.settings.alt.action || client.config.settings.alt.action === '') return;
      let time = Date.now() - member.user.createdTimestamp;
      if (time < client.config.settings.alt.agerequirement) {
        if (client.config.settings.alt.action === 'kick') {
          member.user.send(`your account is too new to join ${member.guild.name}! so you are kicked from the server until your account meets the account age requirement`)
          await client.sleep(1000)
          member.kick()
        } else if (client.config.settings.alt.action === 'ban') {
          member.user.send(`your account is too new to join ${member.guild.name}! so you are banned from the server until your account meets the account age requirement`)
          await client.sleep(1000)
          member.ban()
        }
      }
    }
  }
}

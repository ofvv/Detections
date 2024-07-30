module.exports = async (client) => {
  client.handleDetection = async function(message) {
    try {
      if (client.config.bot.owners.includes(message.author.id)) return;
      if (!client.config.guild.ids.includes(message.guild.id)) return;
      if (message.mentions.users.size > client.config.settings.massmention.limit) {
        if (!client.config.settings.massmention.action || !client.config.settings.massmention.action[0]) return;
        if (client.config.settings.massmention.bypass.includes(message.author.id)) return;
        let actionstaken = [];

        if (client.config.settings.massmention.action.includes('delete')) {
          if (message.deletable) actionstaken.push('Deleted Message')
          await client.sleep(100)
          if (message.deletable) message.delete()
        }
        if (client.config.settings.massmention.action.includes('kick')) {
          if (message.member.kickable) actionstaken.push('Kicked')
          await client.sleep(100)
          if (message.member.kickable) message.member.kick()
        }
        if (client.config.settings.massmention.action.includes('ban')) {
          if (message.member.bannable) actionstaken.push('Banned')
          await client.sleep(100)
          if (message.member.bannable) message.member.ban()
        }
        if (actionstaken[0]) {
          message.author.send(`You mass pinged ${message.mentions.users.size} members of ${message.guild.name} so the following actions were taken on you:\n\`${actionstaken.join('\n') || 'No Actions'}\``)
        }
      }

      if (message.content) {
        if (!client.config.settings.linespam.action || !client.config.settings.linespam.action[0]) return;
        if (client.config.settings.linespam.bypass.includes(message.author.id)) return;
        try {
          let lines = message.content.trim().split('\n').length;
          if (lines > client.config.settings.linespam.limit) {
            let actionstaken = [];
            if (client.config.settings.linespam.action.includes('kick')) {
              if (message.member.kickable) actionstaken.push('Kicked')
              await client.sleep(100)
              if (message.member.kickable) message.member.kick()
            }
            if (client.config.settings.linespam.action.includes('ban')) {
              if (message.member.bannable) actionstaken.push('Banned')
              await client.sleep(100)
              if (message.member.bannable) message.member.ban()
            }
            if (client.config.settings.linespam.action.includes('delete')) {
              if (message.deletable) actionstaken.push('Deleted Message')
              if (message.deletable) message.delete()
            }
            if (actionstaken[0]) {
              message.author.send(`You line spammed ${lines} lines in ${message.guild.name} so the following actions were taken on you:\n\`${actionstaken.join('\n') || 'No Actions'}\``)
            }
          }
        } catch (e) {}
      }
      if (message.content.includes('discord.gg/')) {

        let inviteactions = [];

        if (client.config.settings.invites.bypass.includes(message.author.id)) return;
        console.log(message.content)
        if (client.config.settings.invites.action.includes('delete')) {
          if (message.deletable) inviteactions.push('Deleted Message')
        }
        if (client.config.settings.invites.action.includes('ban')) {
          if (message.member.bannable) inviteactions.push('Banned')
        }
        if (client.config.settings.invites.action.includes('kick')) {
          if (message.member.kickable) inviteactions.push('Kicked')
        }
        if (inviteactions[0]) {
          message.author.send(`You sent an invite in ${message.guild.name} so the following actions were taken on you:\n\`${inviteactions.join('\n') || 'No Actions'}\``)
        }
        await client.sleep(100)
        if (message.deletable && client.config.settings.invites.action.includes('delete')) message.delete()
        if (message.member.kickable && client.config.settings.invites.action.includes('kick')) message.member.kick()
        if (message.member.bannable && client.config.settings.invites.action.includes('ban')) message.member.ban()
      }
      if (message.content) {
        if (client.config.settings.urls.bypass.includes(message.author.id)) return;
        let urlactions = [];

        if (message.content.includes('http://') || message.content.includes('https://')) {
          if (client.config.settings.urls.action.includes('delete')) {
            if (message.deletable) urlactions.push('Deleted Message')
          }
          if (client.config.settings.urls.action.includes('ban')) {
            if (message.member.bannable) urlactions.push('Banned')
          }
          if (client.config.settings.urls.action.includes('kick')) {
            if (message.member.kickable) urlactions.push('Kicked')
          }
          if (urlactions[0]) {
            message.author.send(`You sent a link in ${message.guild.name} so the following actions were taken on you:\n\`${urlactions.join('\n') || 'No Actions'}\``)
          }
          await client.sleep(100)
          if (message.deletable && client.config.settings.urls.action.includes('delete')) message.delete()
          if (message.member.kickable && client.config.settings.urls.action.includes('kick')) message.member.kick()
          if (message.member.bannable && client.config.settings.urls.action.includes('ban')) message.member.ban()
        }
      }
      if (message.content) {
        if (client.config.settings.badwords.bypass.includes(message.author.id)) return;
        let badactions = [];
        const badwords = new client.filter();

        if (badwords.isProfane(message.content)) {
          if (client.config.settings.badwords.action.includes('delete')) {
            if (message.deletable) badactions.push('Deleted Message')
          }
          if (client.config.settings.badwords.action.includes('ban')) {
            if (message.member.bannable) badactions.push('Banned')
          }
          if (client.config.settings.badwords.action.includes('kick')) {
            if (message.member.kickable) badactions.push('Kicked')
          }
          if (badactions[0]) {
            message.author.send(`You sent a bad word in ${message.guild.name} so the following actions were taken on you:\n\`${badactions.join('\n') || 'No Actions'}\``)
          }
          await client.sleep(100)
          if (message.deletable && client.config.settings.badwords.action.includes('delete')) message.delete()
          if (message.member.kickable && client.config.settings.badwords.action.includes('kick')) message.member.kick()
          if (message.member.bannable && client.config.settings.badwords.action.includes('ban')) message.member.ban()
        }
      }
      if (!message.author.bot && message.embeds[0]) {
        let selfactions = [];
        if (client.config.settings.selfbot.action.includes('delete')) {
          if (message.deletable) selfactions.push('Deleted Message')
        }
        if (client.config.settings.selfbot.action.includes('ban')) {
          if (message.member.bannable) selfactions.push('Banned')
        }
        if (client.config.settings.selfbot.action.includes('kick')) {
          if (message.member.kickable) selfactions.push('Kicked')
        }
        if (selfactions[0]) {
          message.author.send(`You sent an embed in ${message.guild.name} so the following actions were taken on you:\n\`${selfactions.join('\n') || 'No Actions'}\``)
        }
        await client.sleep(100)
        if (message.deletable && client.config.settings.selfbot.action.includes('delete')) message.delete()
        if (message.member.kickable && client.config.settings.selfbot.action.includes('kick')) message.member.kick()
        if (message.member.bannable && client.config.settings.selfbot.action.includes('ban')) message.member.ban()
      }
    } catch (e) {}
  }
}

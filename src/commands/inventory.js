const Discord = require("discord.js");
module.exports = {
    name: "inventory",
    description: "Hexi sorts the items in the entered inventory.",
    execute(message, args, connection, izinliRol) {
        const envanterEmbed = new Discord.MessageEmbed()
        .setFooter("ForwardRP")
        if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
            let hex = args[1]
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            connection.query("SELECT * FROM user_inventory WHERE identifier = ?",hex,(err,result) => {
                if (result) {
                    let itemler = []
                    result.forEach(item => {
                        if (item.count !== 0 ) {
                            itemler.push(`${item.item} (**${item.count}**)`)
                        }
                    })
                    envanterEmbed.setColor("GREEN")
                    .setAuthor(`${hex.replace("steam:","")} person's inventory`)
                    .setDescription(itemler)
                    message.channel.send(envanterEmbed)
                } else {
                    envanterEmbed.setColor("RED")
                    .setAuthor("Operation Failed!")
                    .setDescription("No user found with the entered hex ID or the user's inventory is empty.")
                    message.channel.send(envanterEmbed)
                    return;
                }
            })
        } else {
            envanterEmbed.setColor("RED")
            .setAuthor("Operation Failed!")
            .setDescription("You do not have the necessary authority to do this!")
            message.channel.send(envanterEmbed)
            return;
        }
    }
}
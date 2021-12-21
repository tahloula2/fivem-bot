const Discord = require("discord.js");
const meslekler = require("../meslekler.json");
module.exports = {
    name: "id",
    description: "Displays the player's ID.",
    execute(message, args, connection, izinliRol) {
        const bilgiEmbed = new Discord.MessageEmbed()
        .setFooter("ForwardRP")
        if (izinliRol) {
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (!hex) return message.channel.send("You have to enter the HEX ID of the player whose information you want to find!")
                let arama = "SELECT * FROM users WHERE identifier = ?"
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
    
                connection.query(arama,hex, (err,result) => {
                    let user = result[0]
                    if (!user) {
                        bilgiEmbed.setDescription("No user found with the entered Hex ID.")
                        .setColor("RED")
                        .setTitle("Error!")
                        message.channel.send(bilgiEmbed)
                        return;
                    }
                    let sex;
                    if (user.sex === "F") {
                        sex = "Lady"
                    } else {
                        sex = "Boy"
                    }
                    bilgiEmbed.setColor("GREEN")
                    .setAuthor(`${user.name} Steam's information!`)
                    .addField(`📃・Name` ,`${user.firstname} ${user.lastname}`)
                    .addField(`📆・Date of Birth` ,`${user.dateofbirth}`)
                    .addField(`👫・Gender`,sex)
                    .addField(`💼・Occupation`,`${jobs[user.job] || user.job}`)
                    .addField(`💰・Wallet` ,`${user.money}`)
                    .addField(`💳・Bank` ,`${user.bank}`)
                    .addField(`💻・Group` ,`${user.group}`)
                    message.channel.send(bilgiEmbed)
                })
            } else {
                bilgiEmbed.setColor("RED")
                .setDescription(`You are not authorized to do this!`)
                .setAuthor("Operation failed!")
                message.channel.send(bilgiEmbed)
                return;
            }
        } else return

    }
}
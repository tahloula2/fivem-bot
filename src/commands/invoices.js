const Discord = require("discord.js");
module.exports = {
    name: "invoices",
    description: "Hexi shows the invoices of the entered person.",
    execute(message, args, connection, izinliRol) {
        const faturaEmbed = new Discord.MessageEmbed()
        .setFooter("Forward")
        if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
            let hex = args[1]
            if (!hex) return
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            connection.query("SELECT * FROM billing WHERE identifier = ?",hex,(err,result) => {
                if (result) {
                    let faturalar = []
                    let i = 1
                    result.forEach(res => {
                        faturalar.push(`${i}) Reason: ${res.label} --> Amount: **${res.amount}$**`)
                        i++
                    })
                    faturaEmbed.setColor("GREEN")
                    .setDescription(faturalar)
                    .setAuthor(`${hex.replace("steam:","")} person's bills`)
                    message.channel.send(faturaEmbed)
                } else {
                    faturaEmbed.setColor("RED")
                    .setDescription(`No invoice found with the entered Hex ID!`)
                    .setAuthor("Operation failed!")
                    message.channel.send(faturaEmbed)
                    return;
                }
            })
        } else {
            faturaEmbed.setColor("RED")
            .setDescription(`You do not have the authority to do this!`)
            .setAuthor("Operation failed!")
            message.channel.send(faturaEmbed)
            return;
        }
    }
}
const Discord = require("discord.js");
module.exports = {
    name: "addmoney",
    description: "Hexi adds money to the entered person as much as the entered amount.",
    execute(message, args, connection, izinliRol) {
        const paraEmbed = new Discord.MessageEmbed()
            .setFooter("ForwardRP")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let eklenecek = args[2]

                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    let mevcutpara = user.money
                    let para = mevcutpara + parseInt(eklenecek)
                    if (para > 2147483647) return message.channel.send("The amount you entered is huge. The total amount must be less than \`2147483647\`.")
                    if (!user) {
                        paraEmbed.setColor("RED")
                        .setDescription(`No user found with the entered hex ID.`)
                        .setAuthor("Operation failed!")
                        message.channel.send(paraEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET money = ${parseInt(para)} WHERE money = ${user.money}`,(err,result) => {
                        if (err) console.log(err)
                        paraEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun parasına başarıyla \`${eklenecek}\` miktarı eklenmiştir. Yeni miktar \`${para}\`.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(paraEmbed)
                    })
                })

            } else {
                paraEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("Operation failed!")
                message.channel.send(paraEmbed)
                return;
            }
    }
}
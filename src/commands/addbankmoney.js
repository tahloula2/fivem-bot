const Discord = require("discord.js");
module.exports = {
    name: "addbankmoney",
    description: "Hexi adds money to the bank of the person entered, equal to the amount entered.",
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
                    let mevcutpara = user.bank
                    let para = mevcutpara + parseInt(eklenecek)
                    if (para > 2147483647) return message.channel.send("The amount you entered is huge. The total amount must be less than \`2147483647\`.")
                    if (!user) {
                        paraEmbed.setColor("RED")
                        .setDescription(`Girilen hex ID'si ile hiçbir kullanıcı bulunamadı.`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(paraEmbed)
                        return;
                    }
                    connection.query(`UPDATE users SET bank = ${parseInt(para)} WHERE bank = ${user.bank}`,(err,result) => {
                        if (err) console.log(err)
                        paraEmbed.setColor("GREEN")
                        .setDescription(`${hex} ID'li oyuncunun bankadaki parasına başarıyla \`${eklenecek}\` miktarı eklenmiştir. Yeni miktar \`${para}\`.`)
                        .setAuthor("İşlem başarılı!")
                        message.channel.send(paraEmbed)
                    })
                })

            } else {
                paraEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(paraEmbed)
                return;
            }
    }
}
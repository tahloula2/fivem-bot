const Discord = require("discord.js");
module.exports = {
    name: "platechange",
    description: "Changes the entered plate.",
    execute(message, args, connection, izinliRol) {
        const plakaEmbed = new Discord.MessageEmbed()
            .setFooter("ForwardRP")
            if (message.member.permissions.has("ADMINISTRATOR")) {
                let mevcutPlaka = args[1].replace("_"," ")
                let yapilacakPlaka = args[2].replace("_"," ")
                if (!mevcutPlaka || !yapilacakPlaka) return message.channel.send("Misuse ! \n EXAMPLE: !platechange BIN_392 FKA_589")
                if (yapilacakPlaka.length >= 9) {
                    message.channel.send("This plate is huge! Maximum plate length : \`8\`")
                    return;
                }
                connection.query("SELECT * FROM owned_vehicles WHERE plate = ?",mevcutPlaka,(err,result) => {
                    let vehicle = result[0]
                    if (vehicle) {
                        let model = vehicle.vehicle.replace(mevcutPlaka,yapilacakPlaka)
                        connection.query(`UPDATE owned_vehicles SET plate = \'${yapilacakPlaka}\' WHERE plate = \'${vehicle.plate}\'`,(err,result) => {if (err) console.log(err)})
                        connection.query(`UPDATE owned_vehicles SET vehicle = \'${model}\' WHERE vehicle = \'${vehicle.vehicle}\'`,(err,result) => {if (err) console.log(err)})
                        plakaEmbed.setColor("GREEN")
                        .setDescription(`\`${mevcutPlaka}\` plate successfully. \`${yapilacakPlaka}\` replaced with!`)
                        .setAuthor("Transaction successful!")
                        message.channel.send(plakaEmbed)
                        return;
                     } else {
                        plakaEmbed.setColor("RED")
                        .setDescription(`Girilen plaka ile bir araç bulunamadı!`)
                        .setAuthor("İşlem başarısız!")
                        message.channel.send(plakaEmbed)
                        return;
                    }
                })   
            } else {
                plakaEmbed.setColor("RED")
                .setDescription(`Bunu yapmak için gereken yetkiye sahip değilsiniz!`)
                .setAuthor("İşlem başarısız!")
                message.channel.send(plakaEmbed)
                return;
            }
    }
}

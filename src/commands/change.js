const Discord = require("discord.js");
module.exports = {
    name: "change",
    description: "Hexi changes the name of the entered user.",
    execute(message,args,connection,izinliRol) {
        const isimEmbed = new Discord.MessageEmbed()
        .setFooter("ForwardRP")
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let hex = args[1]
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            let isim1 = args[2]
            let isim2 = args[3]
            if (!isim1 || !isim2) return message.channel.send("Misuse! \nEXAMPLE: !change name 11000010aceb57a BA7BA7 Jemli")

            connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                let user = result[0]
                let eskiisim = user.firstname
                let eskisoy = user.lastname
                if (!user) {
                    isimEmbed.setColor("RED")
                    .setDescription(`No user found with the entered hex ID.`)
                    .setAuthor("Operation failed!")
                    message.channel.send(isimEmbed)
                    return;
                }
                connection.query(`UPDATE users SET firstname = '${isim1}' WHERE firstname = '${user.firstname}'`,(err,result) => {if (err) console.log(err)})
                connection.query(`UPDATE users SET lastname = '${isim2}' WHERE lastname = '${user.lastname}'`,(err,result) => {if (err) console.log(err)})
                isimEmbed.setColor("GREEN")
                .setDescription(`${hex} The name of the player with ID has been changed from \`${oldname} ${oldname}\` to \`${name1} ${name2}\`.`)
                .setAuthor("Transaction successful!")
                message.channel.send(isimEmbed)
            })

        } else {
            isimEmbed.setColor("RED")
            .setDescription(`You do not have the necessary authority to do this!`)
            .setAuthor("Operation failed!")
            message.channel.send(isimEmbed)
            return;
        }
    }
}
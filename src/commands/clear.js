const Discord = require("discord.js");
module.exports = {
    name: "clear",
    description: "Hexi assigns CK to the entered person.",
    execute(message, args, connection, izinliRol) {
        const ckEmbed = new Discord.MessageEmbed()
            .setFooter("ForwardRP")
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let hex = args[1]
                if (!hex) return message.channel.send("You must enter a hex.")
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                message.channel.send("Are you sure ? If you are sure this message \`evet\` reply by typing. You have 10 seconds.")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max:1,
                    time:10000
                }).then(c => {
                    if (c.first().content.toLowerCase() === "evet") {
                        connection.query("SELECT * FROM users WHERE identifier = ?",hex, (err,result) => {
                           let user = result[0]
                           if (user) {
                                connection.query("DELETE FROM users WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM addon_account_data WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM characters WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM datastore_data WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM user_accounts WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM user_inventory WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM user_licenses WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM characters_motel WHERE userIdentifier = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM owned_vehicles WHERE owner = ?",hex, (err,results,fields) => {
                                })
                                connection.query("DELETE FROM phone_users_contacts WHERE identifier = ?",hex, (err,results,fields) => {
                                })
                                ckEmbed.setAuthor("Transaction successful!")
                                .setColor("GREEN")
                                .setDescription(`${hex} The person with the ID has been successfully CK!`)
                                message.channel.send(ckEmbed)
                            } else {
                                ckEmbed.setAuthor("Error !")
                                .setColor("RED")
                                .setDescription("No user found with the entered ID! Please try again.")
                                message.channel.send(ckEmbed)
                                return;
                            }
                        })
                    }
                })
            }  else {
                ckEmbed.setColor("RED")
                .setDescription(`You do not have the necessary authority to do this!`)
                .setAuthor("Operation failed!")
                message.channel.send(ckEmbed)
                return;
            }
    }
}
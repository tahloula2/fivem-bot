const Discord = require("discord.js");
module.exports = {
    name: "givejob",
    description: "Hexi gives profession to the entered person.",
    execute(message, args, connection, izinliRol) {
        const meslekEmbed = new Discord.MessageEmbed()
            .setFooter("ForwardRP")
            if(message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let hex = args[1]
                if (hex.startsWith("steam:") === false) {
                    hex = `steam:${hex}`
                }
                let meslek = args[2]
                let grade = parseInt(args[3])
                if (!hex || !meslek || grade === null) return message.channel.send("Misuse ! \nExample:f!givejob 11000010aceb57a police 1")
                connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
                    let user = result[0]
                    if (user) {
                        let eskimeslek = user.job
                        let eskigrade = user.job_grade
                        
                        connection.query(`UPDATE users SET job = '${meslek}' WHERE identifier = '${user.identifier}'`, (err,result) => {
                            if (err) console.log(err)
                        })
                        connection.query(`UPDATE users SET job_grade = ${grade} WHERE identifier = '${user.identifier}'`, (err,result) => {
                            if (err) console.log(err)
                        })
                        meslekEmbed.setColor("GREEN")
                        .setDescription(`${hex} Occupation of the user with the ID \`${eskimeslek}(${eskigrade})\` from your profession \`${meslek}(${grade})\` set to !`)
                        .setAuthor("Transaction successful!")
                        message.channel.send(meslekEmbed)
                    } else {
                        meslekEmbed.setColor("RED")
                        .setDescription(`No user found with the entered hex ID.`)
                        .setAuthor("Operation failed!")
                        message.channel.send(meslekEmbed)
                        return;
                    }
                })
            } else {
                meslekEmbed.setColor("RED")
                .setDescription(`You do not have the necessary authority to do this!`)
                .setAuthor("Operation failed!")
                message.channel.send(meslekEmbed)
                return;
            }
    }
}

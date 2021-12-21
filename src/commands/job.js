const Discord = require("discord.js");
module.exports = {
    name: "job",
    description: "It gives information about the job being searched.",
    execute(message, args, connection, izinliRol) {
        const mbilgiEmbed = new Discord.MessageEmbed()
            .setFooter("ForwardRP")
            if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
                let meslek = args[1]
                let grade = args[2]
                if (!grade) {
                    grade = 0
                }
                connection.query(`SELECT * FROM job_grades WHERE job_name = '${meslek}' AND grade = ${grade}`,(err,result) => {
                    if (err) console.log(err)
                    let bMeslek = result[0]
                    if (bMeslek) {
                        mbilgiEmbed.setColor("GREEN")
                        .setAuthor(`${bMeslek.job_name} knowledge of the profession.`)
                        .addField("Occupational code",bMeslek.job_name)
                        .addField("Profession name",`${bMeslek.job_name} - ${bMeslek.label}`)
                        .addField("Occupation level",bMeslek.grade)
                        .addField("job salary",bMeslek.salary)
                        message.channel.send(mbilgiEmbed)
                    } else {
                        mbilgiEmbed.setColor("RED")
                        .setAuthor("Operation failed!")
                        .setDescription("No job found with the entered name!")
                        message.channel.send(mbilgiEmbed)
                        return;
                    }
                })
            } else {
                mbilgiEmbed.setColor("RED")
                .setDescription(`You do not have the necessary authority to do this!`)
                .setAuthor("Operation failed!")
                message.channel.send(mbilgiEmbed)
                return;
            }
    }
}
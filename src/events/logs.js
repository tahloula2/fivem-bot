/* 
Bütün loglar burada yer alır.
*/

const ayarlar = require("../config.json");
const MySQLEvents = require("mysql-events");
var listener = MySQLEvents(ayarlar.sql);

// WEBHOOK
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const whitelistHook = new Webhook(ayarlar.whitelistlogWebhookURL);
const faturaHook = new Webhook(ayarlar.faturalogWebhookURL);

    // ÖZELLEŞTİRME
    whitelistHook.setAvatar("https://cdn.discordapp.com/attachments/692141297955504182/922620957422665748/logo_-_Copie_2.png") // İstediğiniz resmin linkini koymalısınız.
    whitelistHook.setUsername("Forward RP") // İstediğinizi yazabilirsiniz. 


    faturaHook.setAvatar()
    faturaHook.setUsername("Forward RP")

module.exports = {
    logs: () => {
        
        const LogEmbed = new MessageBuilder()
        .setFooter("Forward RP")

        let green = "#3fd467"
        let red = "#d43f3f"
        
        
        // WHITELIST LOG
        if (ayarlar.whitelistlogAktif === true) {
            
            listener.add("essentialmode.whitelist", (oldRow,newRow,event) =>{
                if (oldRow === null) {
                    LogEmbed.setAuthor("Forward -> Whitelist Added")
                    .setColor(green)
                    .setDescription(`Identifier: **${newRow.fields.identifier}**`)
                    .setTimestamp();
                    whitelistHook.send(LogEmbed)
                }

                if (newRow === null) {
                    LogEmbed.setAuthor("Forward -> Whitelist Deleted")
                    .setColor(red)
                    .setDescription(`Identifier: **${oldRow.fields.identifier}**`)
                    .setTimestamp();
                    whitelistHook.send(LogEmbed)
                }

            })
            console.log("Whitelist log \x1b[32mACTIVE!\x1b[0m")
        } else {
            console.log("Whitelist log \x1b[31mDEACTIVE!\x1b[0m")
        }

        // FATURA LOG
        if (ayarlar.faturalogAktif === true) {
            listener.add("essentialmode.billing",(oldRow,newRow,event) => {

                if (oldRow === null) {
                    LogEmbed.setAuthor("Forward -> Invoice Written")
                    .setColor(green)
                    .setDescription(`Invoice recipient: **${newRow.fields.identifier}** \nInvoice issued by: **${newRow.fields.sender}** \nInvoice reason: **${newRow.fields.label}** \nInvoice amount : **${newRow.fields.amount}**`)
                    .setTimestamp();
                    faturaHook.send(LogEmbed)
                }

                if (newRow === null) {
                    LogEmbed.setAuthor("Forward -> Bill Paid")
                    .setColor(red)
                    .setDescription(`Payer: **${oldRow.fields.identifier}** \nPaid Amount: **${oldRow.fields.amount}** \nInvoice reason: **${oldRow.fields.label}**`)
                    .setTimestamp();
                    faturaHook.send(LogEmbed)
                }
            })
            console.log("Invoice log \x1b[32mACTIVE!\x1b[0m")
        } else {
            console.log("Invoice log \x1b[31mDEACTIVE!\x1b[0m")
        }
    }
}
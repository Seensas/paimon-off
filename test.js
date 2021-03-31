const Discord = require('discord.js'); //Création de la constante Discord 
const client = new Discord.Client(); //Création de la constante client 
const bdd = require("./bdd.json"); //Lien vers la bdd
const bddrepas = require("./repas.json"); //Lien vers la bdd
const bddsummon = require("./summon.json"); //Lien vers la bdd
const prefix = "$"; //Création du préfixe
const fs = require("fs"); //Création de la variable fs pour naviguer dans la bdd

//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("PAIMON est Connectée");
    client.user.setActivity("te manger tes Primos", {type: "PLAYING"});
});

    var compteur = 0;
// Répondre à un message
client.on("message", function (message) {
    try{
        compteur++;
        //eviter le spam
        if (message.author.bot ) return;

        //message privé
        if(message.channel.type == "dm"){message.channel.send("T'es bizarre toi à vouloir me draguer en Privé!")}

        //variable autour de l'utilisateur
        idAuthor = message.author.tag;
        idAuthor = idAuthor.slice(0,-5);
        idAuthorId = message.author.id;
        idP = message.content.slice(5) 
        idP = idP.slice(0,-1);

        //variable Date et Heure
        maDate = new Date();
        nMinutes = maDate.getMinutes();
        nHeure = maDate.getHours();
        nDay = maDate.getDay();

        //variable avatar du user
        let member = message.mentions.users.first() || message.author
        let avatar = member.displayAvatarURL()
        let idTag = member.tag.slice(0,-5);

        //varibale BDD
        let r = fs.readFileSync('bdd.json');
        let s = JSON.parse(r);

        //tableau d'ID des Users du serveurs    
        var idUser =[]
        for(item in s){
            if(item.charAt(0)<='9' && item.charAt(0)>='0'){
                idUser.push(item);
            }   
        }

        //première fois que la personne parle dans le discord, a mettre tout en haut des autres commandes OBLIGATOIREMENT
        if(`${bdd[`${idAuthorId}`]}` === "undefined"){
            bdd[`${idAuthorId}`] = {};
            bdd[`${idAuthorId}`]["Primo"] = 160;
            bdd[`${idAuthorId}`]["recharge"] = true;
            bdd[`${idAuthorId}`]["personnage"] = {};
            bdd[`${idAuthorId}`]["arme"] = {};
            bdd[`${idAuthorId}`]["jour"] = 0;
            Savebdd();
        }

        //gestion de la recharge (une par heure)
        if ( (nHeure != bdd["recharge"]["heure"]) || (nDay != bdd["recharge"]["jour"]) ){

            bdd["recharge"]["heure"] = nHeure;
            bdd["recharge"]["jour"] = nDay;

            idUser.forEach(element => {
                bdd[element]["recharge"] = true;
            });
            Savebdd();
        }

        //---------------------------------------------------------------------------------------SUMMON--------------------------------------------------------------------
        //$feature ou $Feature
        if (message.content === prefix + "feature" ) {message.channel.send("__**Prochaine mise à jour :**__\nRien de prévu pour le moment, nous sommes ouvert à vos suggestions.")}

        //$help ou $Help
        if (message.content === prefix + "help") { 
            message.channel.send(`__**Voici la liste des commandes:**__\n
    Toutes les heures tente ta chance avec le **$p**!\n
    Essaye la commande **$feature** pour savoir ce qu'il t'attend prochainement!\n
    N'oublie la commande **$d** pour la récompense quotidienne!\n
    Essaye la commande **$primo** pour voir ta richesse!\n
    Si tu as 160 <:primo:823874382391934977>, essaye la commande **$summon**!\n
    Pour aller avec cette dernière, essaye le **$inventaire p** pour apercevoir tes personnages ou celui de quelqu'un d'autre en le mentionnant après la commande!\n
    Il en va de même pour ses armes avec la commande **$inventaire a**!\n
            `)}

        //$summon
        if (message.content === prefix + "summon" ) {
            if(bdd[`${idAuthorId}`]["Primo"] >= 160){

                bdd[`${idAuthorId}`]["Primo"] -= 160;
                Savebdd();

                var ChaineSummon ='';
                var raretedoublon ;
                var affichage ='';
                var rarete = Math.floor((Math.random() * 100) + 1)
                //var rarete = 95

                //3 stars⭐⭐⭐
                if(rarete <= 82){
                    raretedoublon = 3;
                    affichage = ':blue_circle: ';
                    rarete = Math.floor((Math.random() * 23) + 0)
                    //rarete = 11
                    var summon = new Discord.MessageEmbed()
                    .setColor("#447AFF")
                    .setTitle(`${bddsummon["summon1"][rarete]["name"]}`)
                    .addFields(
                        {name: `${bddsummon["summon1"][rarete]["titre1"]}`, value:`${bddsummon["summon1"][rarete]["value1"]}`},
                        {name: `${bddsummon["summon1"][rarete]["titre2"]}`, value:`${bddsummon["summon1"][rarete]["value2"]}`}
                    )
                    .setImage(`${bddsummon["summon1"][rarete]["image"]}`)
                    .setFooter(`Requested by ${message.author.tag}`);

                    valsum = bddsummon["summon1"][rarete]["name"]
                    typesum = bddsummon["summon1"][rarete]["type"];
                }
                //4 stars⭐⭐⭐⭐
                else if(rarete <= 95){
                    raretedoublon = 4;
                    affichage= ':purple_circle: ';
                    rarete = Math.floor((Math.random() * 62) + 0)
                    //rarete = 10
                    if(`${bddsummon["summon2"][rarete]["type"]}` === "personnage"){
                        var summon = new Discord.MessageEmbed()
                        .setColor("#8E44FF")
                        .setTitle(`${bddsummon["summon2"][rarete]["name"]}`)
                        .setDescription(`${bddsummon["summon2"][rarete]["description"]}`)
                        .setThumbnail(`${bddsummon["summon2"][rarete]["icon"]}`)
                        .addFields(
                            {name: `${bddsummon["summon2"][rarete]["titre1"]}`, value:`${bddsummon["summon2"][rarete]["value1"]}`},
                            {name: `${bddsummon["summon2"][rarete]["titre2"]}`, value:`${bddsummon["summon2"][rarete]["value2"]}`},
                            {name: `${bddsummon["summon2"][rarete]["titre3"]}`, value:`${bddsummon["summon2"][rarete]["value3"]}`}
                        )
                        .setImage(`${bddsummon["summon2"][rarete]["image"]}`)
                        .setFooter(`Requested by ${message.author.tag}`);
                    }
                    if(`${bddsummon["summon2"][rarete]["type"]}` === "arme"){
                        var summon = new Discord.MessageEmbed()
                        .setColor("#8E44FF")
                        .setTitle(`${bddsummon["summon2"][rarete]["name"]}`)
                        .addFields(
                            {name: `${bddsummon["summon2"][rarete]["titre1"]}`, value:`${bddsummon["summon2"][rarete]["value1"]}`},
                            {name: `${bddsummon["summon2"][rarete]["titre2"]}`, value:`${bddsummon["summon2"][rarete]["value2"]}`}
                        )
                        .setImage(`${bddsummon["summon2"][rarete]["image"]}`)
                        .setFooter(`Requested by ${message.author.tag}`);
                    }
                    valsum = bddsummon["summon2"][rarete]["name"]
                    typesum = bddsummon["summon2"][rarete]["type"];
                }

                //5 stars⭐⭐⭐⭐⭐
                else if(rarete <= 100){
                    raretedoublon = 5;
                    affichage = ':yellow_circle: ';
                    rarete = Math.floor((Math.random() * 27) + 0)
                    //rarete = 10
                    if(`${bddsummon["summon3"][rarete]["type"]}` === "personnage"){
                        var summon = new Discord.MessageEmbed()
                        .setColor("#EBFF44")
                        .setTitle(`${bddsummon["summon3"][rarete]["name"]}`)
                        .setDescription(`${bddsummon["summon3"][rarete]["description"]}`)
                        .setThumbnail(`${bddsummon["summon3"][rarete]["icon"]}`)
                        .addFields(
                            {name: `${bddsummon["summon3"][rarete]["titre1"]}`, value:`${bddsummon["summon3"][rarete]["value1"]}`},
                            {name: `${bddsummon["summon3"][rarete]["titre2"]}`, value:`${bddsummon["summon3"][rarete]["value2"]}`},
                            {name: `${bddsummon["summon3"][rarete]["titre3"]}`, value:`${bddsummon["summon3"][rarete]["value3"]}`}
                        )
                        .setImage(`${bddsummon["summon3"][rarete]["image"]}`)
                        .setFooter(`Requested by ${message.author.tag}`);
                    }
                    if(`${bddsummon["summon3"][rarete]["type"]}` === "arme"){
                        var summon = new Discord.MessageEmbed()
                        .setColor("#EBFF44")
                        .setTitle(`${bddsummon["summon3"][rarete]["name"]}`)
                        .addFields(
                            {name: `${bddsummon["summon3"][rarete]["titre1"]}`, value:`${bddsummon["summon3"][rarete]["value1"]}`},
                            {name: `${bddsummon["summon3"][rarete]["titre2"]}`, value:`${bddsummon["summon3"][rarete]["value2"]}`}
                        )
                        .setImage(`${bddsummon["summon3"][rarete]["image"]}`)
                        .setFooter(`Requested by ${message.author.tag}`);
                    }
                    valsum = bddsummon["summon3"][rarete]["name"];
                    typesum = bddsummon["summon3"][rarete]["type"];
                }

                message.channel.send(summon);

                //Si je joueur n'a pas l'arme / personnage
                if(`${bdd[`${idAuthorId}`][`${typesum}`][`${affichage+valsum}`]}` === "undefined")
                {
                    bdd[`${idAuthorId}`][`${typesum}`][`${affichage+valsum}`] = true;
                    Savebdd();
                }   
                else
                {
                    var doublon = 0;
                    if(raretedoublon === 3)
                    {
                        // 1/2 invo ??
                        doublon += 70; 
                    }else if(raretedoublon === 4)
                    {
                        //2 invo ??
                        doublon += 320; 
                    }
                    else if (raretedoublon === 5){
                        //10 invo ??
                        doublon += 1600; 
                    }
                    bdd[`${idAuthorId}`]["Primo"] += doublon;
                    Savebdd();
                    ChaineSummon +=`Paimon vend votre doublon pour **${doublon}**<:primo:823874382391934977>.\n`;
                }
                ChaineSummon += `Votre nouveau solde est de : **${bdd[`${idAuthorId}`]["Primo"]}**<:primo:823874382391934977>.`;
            }else{
                ChaineSummon =`Le montant pour une summon est de : **160**<:primo:823874382391934977>.\nVotre solde est de : **${bdd[`${idAuthorId}`]["Primo"]}**<:primo:823874382391934977>.`;
            }
            message.channel.send(ChaineSummon)   
        }

        // roulette aux primos ($p)
        if(message.content === prefix + "p") {
            if(bdd[`${idAuthorId}`]["recharge"] === true) {

                var ligne = ['0','0','0','0','0','0','0','0','0','0','0','0'];
                var emojis = ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'];
                var index1 = 0;
                var gain= ['false','false','false','false'];
                var ChainePrimo='';

                bdd[`${idAuthorId}`]["recharge"] = false;
                Savebdd();

                for (let index = 0; index < ligne.length; index++) {
                    ligne[index]= Math.floor((Math.random() * 100) + 1); 
                }
                //première ligne    0.9 | 0.9 | 0.9 -> 0.73
                for (index1 = 0; index1 < 3 ; index1++) {
                    if(ligne[index1] <= 90){
                        emojis[index1]=`<:chest1:823835280670851102>`;
                    }else{
                        emojis[index1]=`<:Sad_Cat_Thumbs_Up:809169993698246658>`;
                    }
                }
                //3 identiques alors cloche sinon croix
                if( (emojis[0] === emojis[1]) && (emojis[1] === emojis[2]) && (emojis[0]) != `<:Sad_Cat_Thumbs_Up:809169993698246658>`){emojis[12]=`<:paimon:823866066731663401>`;gain[0]= true;}
                else{emojis[12]=`<:croix:823852490444243014>`;}

                //deuxième ligne    0.79 | 0.79 | 0.79 -> 0.493
                for (index1 = 3; index1 < 6 ; index1++) {
                    if(ligne[index1] <= 79){
                        emojis[index1]=`<:chest2:823835291289780254>`;
                    }else{
                        emojis[index1]=`<:Sad_Cat_Thumbs_Up:809169993698246658>`;
                    }
                }
                //3 identiques alors cloche sinon croix
                if( (emojis[3] === emojis[4]) && (emojis[4] === emojis[5]) && (emojis[3]) != `<:Sad_Cat_Thumbs_Up:809169993698246658>`){emojis[13]=`<:paimon:823866066731663401>`;gain[1]= true;}
                else{emojis[13]=`<:croix:823852490444243014>`;}

                //troisième ligne   0.63 | 0.63 | 0.63 -> 0.25
                for (index1 = 6; index1 < 9 ; index1++) {
                    if(ligne[index1] <= 63){
                        emojis[index1]=`<:chest3:823835302761594931>`;
                    }else{
                        emojis[index1]=`<:Sad_Cat_Thumbs_Up:809169993698246658>`;
                    }
                }
                //3 identiques alors cloche sinon croix
                if( (emojis[6] === emojis[7]) && (emojis[7] === emojis[8]) && (emojis[6]) != `<:Sad_Cat_Thumbs_Up:809169993698246658>`){emojis[14]=`<:paimon:823866066731663401>`;gain[2]= true;}
                else{emojis[14]=`<:croix:823852490444243014>`;}

                //quatrième ligne   1/3 | 1/3 | 1/3 -> 0.05
                for (index1 = 9; index1 < 12 ; index1++) {
                    if(ligne[index1] <= 33){
                        emojis[index1]=`<:chest4:823835313641095178>`;
                    }else{
                        emojis[index1]=`<:Sad_Cat_Thumbs_Up:809169993698246658>`;
                    }
                }
                //3 identiques alors cloche sinon croix
                if( (emojis[9] === emojis[10]) && (emojis[10] === emojis[11]) && (emojis[9]) != `<:Sad_Cat_Thumbs_Up:809169993698246658>`){emojis[15]=`<:paimon:823866066731663401>`;gain[3]= true;}
                else{emojis[15]=`<:croix:823852490444243014>`;}

                message.channel.send(`${emojis[0]}${emojis[1]}${emojis[2]}  ${emojis[12]}\n${emojis[3]}${emojis[4]}${emojis[5]}  ${emojis[13]}\n${emojis[6]}${emojis[7]}${emojis[8]}  ${emojis[14]}\n${emojis[9]}${emojis[10]}${emojis[11]}  ${emojis[15]}\n`)
                
                if(gain[0] === true){
                    var repas = Math.floor((Math.random() * 14) + 0)
                    ChainePrimo += `${idAuthor}: Vous avez obtenu un <:chest1:823835280670851102>, Paimon sent l'odeur ${bddrepas["repas1"][repas]["name"]}, vous encaissez : **5** <:primo:823874382391934977> \n`;
                    bdd[`${idAuthorId}`]["Primo"] += 5;
                }
                if(gain[1] === true){
                    var repas = Math.floor((Math.random() * 14) + 0)
                    ChainePrimo += `${idAuthor}: Voilà qui est mieux, vous venez de gagner un <:chest2:823835291289780254>, Paimon engloutit ${bddrepas["repas2"][repas]["name"]}, vous encaissez : **10** <:primo:823874382391934977>\n`;
                    bdd[`${idAuthorId}`]["Primo"] += 10;
                }
                if(gain[2] === true){
                    var repas = Math.floor((Math.random() * 14) + 0)
                    ChainePrimo += `${idAuthor}: Très impressionnant !!! Vous avez eu un <:chest3:823835302761594931>, Paimon savoure ${bddrepas["repas3"][repas]["name"]}, vous encaissez : **25** <:primo:823874382391934977> \n`;
                    bdd[`${idAuthorId}`]["Primo"] += 25;
                }
                if(gain[3] === true){
                    var repas = Math.floor((Math.random() * 1) + 0)
                    ChainePrimo += `${idAuthor}: Félicitations, vous venez de gagner un... Un... <:chest4:823835313641095178>, ${bddrepas["repas4"][repas]["name"]} Vous encaissez : **80** <:primo:823874382391934977> \n`;
                    bdd[`${idAuthorId}`]["Primo"] += 80;
                }
                Savebdd(); 

                if( (gain[0] === "false") && (gain[1] === "false") && (gain[2] === "false") &&(gain[3] === "false") ){ChainePrimo += `Paimon : Mais j'ai **FAIMMMMMM** moi !!! Vous n'encaissez pas de <:primo:823874382391934977> \n`}
            }else{
        
                ChainePrimo = `Temps restant avant votre prochain **$p** : ${60 - (new Date()).getMinutes()} min.`;  
            }
            message.channel.send(ChainePrimo);
        }
        //$inventaire a
        if(message.content.startsWith(prefix + "inventaire a")){
            var inventaireA =[]
            
            if(`${bdd[`${member.id}`]}` === "undefined"){console.log("pas d'inventaire")}
            else{
            for(item in bdd[member.id]["arme"]){  
                    inventaireA.push(item)
                }
                if(inventaireA != ''){

                    var x = inventaireA.length;
                    var page = 0;
                    console.log(inventaireA.sort((a, b) => {
                        return b.localeCompare(a, 'en', { sensitivity: 'base' });
                    }))

                    var invEmbed2 = new Discord.MessageEmbed()
                        .setColor(`#581845`)
                        .setTitle(`Inventaire de ${idTag}`)
                        .setThumbnail(`${avatar}`)

                        var chaineA='';

                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                            if(inventaireA[index] != undefined){
                            chaineA = `${chaineA}` + `${inventaireA[index]}` + `\n`}
                        }
                        invEmbed2.addFields({name: `Armes:`, value : `${chaineA}`});
                        x-=10;

                        client.channels.cache.get("824298082572828713").send(invEmbed2).then(async message => {
                            await message.react('⬅');
                            await message.react('➡');
                
                            const filter = (reaction) => {
                                return ['⬅', '➡'].includes(reaction.emoji.name);
                            };
                            client.on('messageReactionRemove', (reaction,user ) =>{
                                if (reaction.emoji.name === '⬅') {
                                    if(page>0){
                                        x+=10;
                                        page-=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                    
                                        var chaineA='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireA[index] != undefined){
                                            chaineA = `${chaineA}` + `${inventaireA[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Armes:`, value : `${chaineA}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                } else {
                                    if(x>0 ){
                                        x-=10;
                                        page+=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                                        var chaineA='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireA[index] != undefined){
                                            chaineA = `${chaineA}` + `${inventaireA[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Armes:`, value : `${chaineA}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                }
                            })
                            client.on('messageReactionAdd', (reaction,user ) =>{
                                if (reaction.emoji.name === '⬅') {
                                    if(page>0){
                                        x+=10;
                                        page-=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                                        var chaineA='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireA[index] != undefined){
                                            chaineA = `${chaineA}` + `${inventaireA[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Armes:`, value : `${chaineA}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                } else {
                                    if(x>0 ){
                                        x-=10;
                                        page+=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                    
                                        var chaineA='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireA[index] != undefined){
                                            chaineA = `${chaineA}` + `${inventaireA[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Armes:`, value : `${chaineA}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                }
                            })
                    }).catch(console.error);
                }else{message.channel.send("Cette personne ne possède pas d'arme !")}
            }
        }
        //$inventaire p
        if(message.content.startsWith(prefix + "inventaire p")){
            var inventaireP =[]

            if(`${bdd[`${member.id}`]}` === "undefined"){console.log("pas de personnage")}
            else{
            for(item in bdd[member.id]["personnage"]){  
                    inventaireP.push(item)
                }
                if(inventaireP != ''){
                    var x = inventaireP.length;
                    var page = 0;
                    console.log(inventaireP.sort((a, b) => {
                        return b.localeCompare(a, 'en', { sensitivity: 'base' });
                    }))

                    var invEmbed2 = new Discord.MessageEmbed()
                        .setColor(`#581845`)
                        .setTitle(`Inventaire de ${idTag}`)
                        .setThumbnail(`${avatar}`)

                        var chaineP='';

                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                            if(inventaireP[index] != undefined){
                            chaineP = `${chaineP}` + `${inventaireP[index]}` + `\n`}
                        }
                        invEmbed2.addFields({name: `Personnage:`, value : `${chaineP}`});
                        x-=10;
                        client.channels.cache.get("824298082572828713").send(invEmbed2).then(async message => {
                            await message.react('⬅');
                            await message.react('➡');
                
                            const filter = (reaction) => {
                                return ['⬅', '➡'].includes(reaction.emoji.name);
                            };
                            client.on('messageReactionRemove', (reaction,user ) =>{
                                if (reaction.emoji.name === '⬅') {
                                    if(page>0){
                                        x+=10;
                                        page-=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                                        var chaineP='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireP[index] != undefined){
                                            chaineP = `${chaineP}` + `${inventaireP[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Personnages:`, value : `${chaineP}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                } else if (reaction.emoji.name === '⬅'){
                                    if(x>0 ){
                                        x-=10;
                                        page+=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                                        var chaineP='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireP[index] != undefined){
                                            chaineP = `${chaineP}` + `${inventaireP[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Personnage:`, value : `${chaineP}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                }
                            })
                            client.on('messageReactionAdd', (reaction,user ) =>{
                                if (reaction.emoji.name === '⬅') {
                                    if(page>0){
                                        x+=10;
                                        page-=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                    
                                        var chaineP='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireP[index] != undefined){
                                            chaineP = `${chaineP}` + `${inventaireP[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Personnage:`, value : `${chaineP}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                } else if (reaction.emoji.name === '⬅'){
                                    if(x>0 ){
                                        x-=10;
                                        page+=1;
                                        var invEmbed2 = new Discord.MessageEmbed()
                                        .setColor(`#581845`)
                                        .setTitle(`Inventaire de ${idTag}`)
                                        .setThumbnail(`${avatar}`)
                    
                                        var chaineP='';
                    
                                        for(let index = 0+(page*10); index<10+(page*10) ; index++){
                                            if(inventaireP[index] != undefined){
                                            chaineP = `${chaineP}` + `${inventaireP[index]}` + `\n`}
                                        }
                                        invEmbed2.addFields({name: `Personnage:`, value : `${chaineP}`});
                                        
                                        message.edit(invEmbed2)
                                    }
                                }
                            })
                    }).catch(console.error);
                }else{message.channel.send("Cette personne ne possède pas de personnage !")}
            }
        }

        //$primo
        if (message.content === prefix + "primo") { message.channel.send(`Tu possèdes actuellement: **${bdd[`${idAuthorId}`]["Primo"]}** <:primo:823874382391934977>`);}

        //$d
        if(message.content === prefix + "d") {
            if((nDay != bdd[`${idAuthorId}`]["jour"])) {
                bdd[`${idAuthorId}`]["jour"] = nDay;
                bdd[`${idAuthorId}`]["Primo"] += 50; 
                Savebdd();
                message.channel.send("La connexion quotidienne te rapporte **50**<:primo:823874382391934977> ")
            }else{
                message.channel.send("La connexion quotidienne a déjà été faite, reviens demain !")
            }
        }

        //$gift
        if(message.content.startsWith(prefix + "gift") && (idAuthorId === "332503820271616000")){
            const tab = message.content.split(' ');
            var gift = parseInt(tab ["1"], 10)
            if( !gift){gift = 160;}
            if((gift >0) && (gift<=3200) ){
                idUser.forEach(element => {
                    bdd[element]["Primo"] += gift;
                });

                Savebdd();
                message.channel.send(`Tout le monde viens de recevoir **${gift}**<:primo:823874382391934977>.\nMerci PAIMON ! `)
            }
        }

        if(message.content === prefix + "save")
        {
            console.log(bdd);
        }
    }catch{
        console.error(error);
    }
    },1000);

    //boss + $boss
    //$pariz
});

//sauvegarde de la bdd
function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("une erreur est survenue");
    });
}

client.login(process.env.TOKEN);

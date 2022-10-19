/** Classe représentant un logger pour sortir des infos en console*/
class Logger{
    /**
     * Créer un logger.
     * @param  {[string]} prefix - chaine de caractère a afficher avant un message
     */
    constructor(prefix){
        this.prefix = prefix;
    }

    /**
     * Affiche un message en console.
     * @param {string} message - Contenu du message
     */
    print(message){
        console.log(`${this.prefix} ${message}`);
    }
}


const logger = new Logger("[*]");

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

if (window.location.hostname == "0370035m.index-education.net") {
    console.log('page pronote detectée')
    getData()
}

async function getData() {
    while (document.querySelectorAll('.ObjetBandeauEspace').length == 0) {
        if(document.querySelectorAll('.smartbanner').length != 0){
            document.body.innerHTML = "Pronote ++ n'est pas compatible avec la version mobile de pronote"
        }
        await delay(300)
    }
    await delay(100)
    const page_brut = document.body
    const nom = ((document.querySelectorAll('.ibe_util')[0].innerText).split('- ')[1]).split(' ')[0]
    const prenom = ((document.querySelectorAll('.ibe_util')[0].innerText).split('- ')[1]).split(' ')[1]
    const removeAttributes = (element) => {
        while (element.attributes.length > 0) {
            element.removeAttribute(element.attributes[0].name);
        }
    };
    logger.print(`Compte connecté sous le nom de ${prenom} ${nom}`)
    removeAttributes(document.body)
    document.body.innerHTML = `<h3>Bienvenue ${prenom}.</h3>`
    
}
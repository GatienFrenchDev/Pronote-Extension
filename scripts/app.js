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
    document.body.innerHTML = `
    <!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pronote ++</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro';
    font-weight: 400;
}

body{
    width: 100vw;
    height: 100vh;
}

div.main{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 13fr;
}

div#bandeau{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 5vh;
    padding-bottom: 5vh;
}


img.bandeau-logo, img.bandeau-pp{
    height: 52px;
}

p#sous-logo{
    text-align: center;
    font-size: 18px;
}

img.bandeau-pp{
    border-radius: 10%;
}

div#fenetre{
    margin-left: 2vw;
}

h3#titre{
    margin-top: 5vh;
    display: flex;
    font-size: 28px;
    align-items: center;
    margin-bottom: 5vh;
}

p#t-prenom{
    font-weight: 700;
}

div#cours-venir{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 10fr;
    height: 40vh;
    color: white;
    background: #3347B0;
    width: 45vw;
    padding: 15px;
    border-radius: 0px;
}

p#titre-cours-box{
    display: flex;
    align-items: center;
    font-size: 16px;
}
    </style>
</head>

<body>
    <div class="main">
        <div id="bandeau">
            <img src="icon.png" alt="logo pronote" class="bandeau-logo">
            <img src="../prive/pp.jpg" alt="photo de profil" class="bandeau-pp">
        </div>
        <div id="fenetre">
            <h3 id="titre">Rebonjour&nbsp;<p id="t-prenom">${prenom}</p>&nbsp;!</h3>
            <div id="cours-venir">
                <p id="titre-cours-box"><i class="bi bi-book"></i>&nbsp;Cours à venir</p>
                <div class="box-cours"></div>
                <div class="box-cours"></div>
                <div class="box-cours"></div>
            </div>
        </div>
    </div>
</body>

</html>
    `
    
}
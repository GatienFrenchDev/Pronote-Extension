let interval = setInterval(() => {
    try {
        document.querySelectorAll('.ibe_util_photo')[0].children[0].src = "https://cdn.discordapp.com/attachments/898909929509908501/1034523357078626324/pp.jpg"
        clearInterval(interval)
    }
    catch {

    }
}, 50);

let matiere = {}
let intervale = setInterval(() => {
    console.log('a')
    if (document.querySelectorAll('.DonneesListe_DernieresNotes').length == 0) {
        return
    }    
    let data = Array.from(document.querySelectorAll('.Gras.Espace'))
    data.shift()
    data.forEach((element) => {
        matiere[element.children[1].innerText] = element.children[0].innerText
    })
    if(document.querySelectorAll('#export-pdf').length == 0){
        let button = document.createElement('button')
        button.id = "export-pdf"
        button.innerText = "EXPORT PDF"
        document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').appendChild(button)
    }
    console.log(matiere)
}, 100);

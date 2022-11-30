/*!
* Extension [Pronote ++]
* https://github.com/GatienFrenchDev/pronote-pp
* License : MIT
* Codé par @GatienFrenchDev
*/


let matiere = {}
let ex_matiere = "empty"
let notes_matiere_actuelle = []
let intervale = setInterval(() => {
    if (document.querySelectorAll('.DonneesListe_DernieresNotes').length == 0) {
        return
    }
    let data = Array.from(document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').children)
    for (i = 0; i < data.length; i++) {

        // check que le bloc *data[i]* soit une matière ou bien une note
        if (!(data[i].innerHTML.includes("Moy. ") || data[i].innerHTML.includes('div class="Gras Espace"'))) {
            continue
        }

        let res = data[i].children[0].children[0].children[0].children[0].innerText

        // check si le bloc est une matière
        if (!res.includes('Moy.')) {
            // check si *ex_matiere* a déjà était bougé
            if (ex_matiere != "empty") {
                matiere[ex_matiere] = notes_matiere_actuelle
                notes_matiere_actuelle = []
            }
            // cas ou *ex_matiere* n'avait était encore jamais bougé
            ex_matiere = res
        }
        else {
            res = res.split("\n")
            notes_matiere_actuelle.push(res)
        }
    }

    document.querySelectorAll('.as-li.c_1.ie-ellipsis').forEach(item => {
        item.addEventListener(('click'), () => {
            setTimeout(function(){
                matiere = {}
                ex_matiere = "empty"
                notes_matiere_actuelle = []
            }, 800);
        })
    })

    if (document.querySelectorAll('#export-pdf').length == 0) {
        let div = document.createElement('div')
        div.id = "abordable"
        div.style.display = "flex"
        div.style.alignItems = "center"
        div.style.justifyContent = "center"
        let button = document.createElement('button')
        div.style.width = document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').style.width
        button.style.width = "100%"
        button.style.height = "50px"
        button.id = "export-pdf"
        button.innerText = "Visualer dans Pronote++"
        div.appendChild(button)
        document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').appendChild(div)
        let info = {
            "nom": document.querySelector('.ibe_util_texte.ibe_actif').innerText.split(" - ")[1],
            "moyenne": document.querySelectorAll('.Gras.InlineBlock.PetitEspaceHaut.PetitEspaceBas.EspaceDroit.EspaceGauche10')[0].innerText.split(" : ")[1],
            "moyenne_g": document.querySelectorAll('.Gras.InlineBlock.PetitEspaceHaut.PetitEspaceBas.EspaceDroit.EspaceGauche10')[1].innerText.split(" : ")[1]
        }
        document.getElementById('export-pdf').addEventListener(('click'), () => {
            //clearInterval(intervale)
            generateFile(matiere, info)
            matiere = {}
            notes_matiere_actuelle = []
        })
    }
}, 100);

function generateFile(data, infos) {
    console.log(data)
    let donnes = {}
    for (const [key, value] of Object.entries(data)) {
        let matiere = key.split('\n')[1]
        if (donnes.hasOwnProperty(matiere)) {
            let temp = donnes[matiere]
            donnes[`${matiere} #1`] = temp
            delete donnes[matiere]
            matiere = `${matiere} #2`
        }

        const moy_g = key.split('\n')[0]
        donnes[matiere] = [moy_g]
        value.forEach(element => {
            let haha = []
            element.forEach(item => {
                if (!item.includes("Corrigé") && !item.includes("Sujet")) {
                    if (item.includes("Moy. ")) {
                        // cas ou moyenne matiere
                        item = parseFloat((item.split(" : ")[1]).replace(",", "."))
                    }
                    else if (item.includes("Aujourd")){
                        const today = new Date();
                        item = `${today.getDate()}/${today.getMonth()+1}`
                    }
                    else if (item.includes("le ")) {
                        // cas ou date
                        item = item.split("le ")[1]
                    }
                    else {
                        // cas ou note eleve
                        // ex valeur item : "5,00/10" ou bien "19,00"

                        // cas ou note pas sur 20
                        if (item.split("/").length > 1) {
                            item = item.replace(",", ".")
                            let numerateur = parseFloat(item.split("/")[0])
                            let denominateur = parseFloat(item.split("/")[1])
                            item = (numerateur * 20) / denominateur
                        } else {
                            item = parseFloat(item.replace(",", "."))
                        }
                    }
                    haha.push(item)
                }
            })
            let table = donnes[matiere]
            table.push(haha)
            donnes[matiere] = table
        })
    }
    document.getElementById('GInterface.Instances[2]_detail').innerHTML = `<div style="width: 800px;"><canvas id="acquisitions"></canvas></div>`
    chrome.runtime.sendMessage({ "data": donnes, "infos": infos }, () => { })

}

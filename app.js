let interval = setInterval(() => {
    try {
        document.querySelectorAll('.ibe_util_photo')[0].children[0].src = ""
        clearInterval(interval)
    }
    catch {

    }
}, 50);



let matiere = {}
let ex_matiere = "empty"
let notes_matiere_actuelle = []
let intervale = setInterval(() => {
    if (document.querySelectorAll('.DonneesListe_DernieresNotes').length == 0) {
        return
    }
    let data = Array.from(document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').children)
    for (i = 0; i < data.length; i++) {

        // checl que le bloc *data[i]* soit une matière ou bien une note
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
    /*
    
    Exemple de data :
    let data = {"14,00\nENS. MORAL & CIVIQUE":[["14,00","le 31/10","Moy. classe : 13,09"]],"10,00\nPHILOSOPHIE":[["11,00","le 10/11","Moy. classe : 10,68"],["8,00","le 07/10","Moy. classe : 10,77"],["10,00","le 01/10","Moy. classe : 10,89"]],"12,88\nHISTOIRE-GEOGRAPHIE":[["12,00","Corrigé","le 05/11","Moy. classe : 13,06"],["13,00","le 06/10","Moy. classe : 15,50"],["12,00","le 27/09","Moy. classe : 15,09"],["17,00","Corrigé","le 25/09","Moy. classe : 14,54"]],"14,00\nENSEIGN.SCIENTIFIQUE":[["6,00/10","le 12/11","Moy. classe : 6,92/10"],["12,50","le 24/10","Moy. classe : 14,09"],["8,00","le 09/10","Moy. classe : 13,21"],["15,00","le 19/09","Moy. classe : 13,48"]],"13,80\nENSEIGN.SCIENTIFIQUE":[["9,50/10","le 21/11","Moy. classe : 8,44/10"],["9,00/10","le 14/11","Moy. classe : 7,64/10"],["12,00","le 17/10","Moy. classe : 12,93"],["9,00/10","le 19/09","Moy. classe : 8,03/10"]],"13,54\nANGLAIS LVA":[["12,00","le 23/11","Moy. classe : 14,29"],["14,00","le 16/11","Moy. classe : 13,23"],["18,00","le 07/11","Moy. classe : 14,56"],["14,00","le 10/10","Moy. classe : 13,89"],["8,00","le 26/09","Moy. classe : 12,91"]],"10,80\nALLEMAND LVB":[["14,00","le 23/11","Moy. groupe : 15,44"],["14,00","le 23/11","Moy. groupe : 15,44"],["11,00","le 07/11","Moy. groupe : 13,97"],["6,50","le 07/11","Moy. groupe : 10,50"],["9,00/10","le 19/10","Moy. groupe : 9,28/10"],["5,00/10","le 19/10","Moy. groupe : 7,00/10"]],"15,50\nEDUCATION PHYS SPO":[["15,50","le 25/11","Moy. groupe : 16,74"]],"19,00\nMATHEMATIQUES":[["18,00","le 26/11","Moy. groupe : 11,92"],["19,00","le 26/11","Moy. groupe : 12,31"],["19,75","le 15/11","Moy. groupe : 11,85"],["15,75","le 10/11","Moy. groupe : 10,28"]],"15,64\nMATHS EXPERTES":[["20,00","le 13/10","Moy. groupe : 18,67"],["12,00","le 13/10","Moy. groupe : 12,67"],["18,00","le 02/10","Moy. groupe : 18,76"],["17,00","le 25/09","Moy. groupe : 15,90"],["11,56","le 22/09","Moy. groupe : 9,64"]],"18,29\nNUMERIQUE SC.INFORM.":[["18,00","le 23/11","Moy. groupe : 16,00"],["6,00/10","le 19/10","Moy. groupe : 6,24/10"],["7,00/8","le 12/10","Moy. groupe : 7,13/8"],["10,50/12","le 12/10","Moy. groupe : 9,76/12"],["19,00","le 06/10","Moy. groupe : 16,89"],["11,00/12","Sujet","le 21/09","Moy. groupe : 10,21/12"],["8,00/8","le 14/09","Moy. groupe : 7,63/8"],["9,00/10","le 19/09","Moy. classe : 8,03/10"]]}
    */
    let donnes = {}
    for (const [key, value] of Object.entries(data)) {
        const matiere = key.split('\n')[1]
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
                    else if (item.includes("le ")) {
                        // cas ou date
                        item = item.split("le ")[1]
                    }
                    else {
                        // cas ou note eleve
                        item = parseFloat(item.replace(",", "."))
                    }
                    haha.push(item)
                }
            })
            let table = donnes[matiere]
            table.push(haha)
            donnes[matiere] = table
            // console.log(value)
            // if (!element.contains("Corri") && !element.contains("Suje")){
            //     const hahaha = donnes[matiere].push(element)
            //     donnes[matiere] = hahaha
            // }
        })
    }
    document.getElementById('GInterface.Instances[2]_detail').innerHTML = `<div style="width: 800px;"><canvas id="acquisitions"></canvas></div>`
    chrome.runtime.sendMessage({ "data": donnes, "infos": infos }, (res) => {
        // console.log(res)
    })

}

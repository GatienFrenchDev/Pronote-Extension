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
    if (document.querySelectorAll('.DonneesListe_DernieresNotes').length == 0) {
        return
    }
    const data = Array.from(document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').children)
    let contenu = []
    for (i = 0; i < data.length; i++) {
        try {
            let res = ""
            try{
                res = data[i].children[0].children[0].children[0].children[0].innerText
            }catch{

            // let res = data[i].children[0].children[0].children[0].children[0].innerText

            }
            if (!contenu.includes(res)){
                contenu.push(res)
            }
            // if (!data[i].children[0].children[0].children[0].children[0].innerText.includes("Moy.")) {
                // console.log(`${data[i].children[0].children[0].children[0].children[0].innerText}`)
                // let j = i + 1
                // let res = false

                // while (!res) {
                //     try {
                //         res = data[j].children[0].children[0].children[0].children[0].innerText.includes("Moy.")
                //     } catch {

                //     }
                // }

                
            //     i = j
            // }
            // data.push(data[i].children[0].children[0].children[0].children[0].innerText)
        } catch {
        }
    }


    // let data = Array.from(document.querySelectorAll('.Gras.Espace'))
    // data.shift()
    // data.forEach((element) => {
    //     if (`${element.children[1].innerText}@${element.children[0].innerText}` in matiere){
    //         return
    //     }
    //     let notes = []
    //     matiere[`${element.children[1].innerText}@${element.children[0].innerText}`] = notes
    // })
    if (document.querySelectorAll('#export-pdf').length == 0) {
        let div = document.createElement('div')
        div.id = "abordable"
        div.style.display = "flex"
        div.style.alignItems = "center"
        div.style.justifyContent = "center"
        let button = document.createElement('button')
        div.style.width = "400px"
        button.style.width = "100%"
        button.style.height = "50px"
        button.id = "export-pdf"
        button.innerText = "EXPORT PDF"
        div.appendChild(button)
        document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1').appendChild(div)
        document.getElementById('export-pdf').addEventListener(('click'), () => {
            clearInterval(intervale)
            console.log('RESULTAT :')
            console.log(contenu)
        })
    }
}, 100);

let interval = setInterval(() => {
    try {
        document.querySelectorAll('.ibe_util_photo')[0].children[0].src = "https://cdn.discordapp.com/attachments/898909929509908501/1034523357078626324/pp.jpg"
        clearInterval(interval)
    }
    catch {

    }
}, 50);

let intervale = setInterval(() => {
    console.log('a')
    if (document.querySelectorAll('.DonneesListe_DernieresNotes').length == 0) {
        return
    }
    let data = Array.from(document.querySelectorAll('.Gras.Espace'))
    data.shift()
    let matiere = {}
    data.forEach((element) => {
        matiere[element.children[1].innerText] = matiere[element.children[0].innerText]
    })
    console.log(matiere)
    clearInterval(intervale)
}, 500);

// let done = false
// document.addEventListener('keypress', () =>{
//     if (done) return
//     if (document.querySelectorAll('.DonneesListe_DernieresNotes').length > 0){
//         done = !done
//         console.log('hahahha')
//         let data = Array.from(document.querySelectorAll('.Gras.Espace'))
//         data.shift()
//         let matiere = {}
//         data.forEach((element) => {
//             matiere[element.children[1].innerText] = matiere[element.children[0].innerText]
//         })
//         console.log(matiere)
//     }
// })




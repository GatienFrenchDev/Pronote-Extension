console.log(window.location.hostname)

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

if (window.location.hostname == "0370035m.index-education.net") {
    getData()
}

async function getData() {
    while(document.querySelectorAll('.objetBandeauEntete_boutons') == []){
        console.log('Attente de la connexion ...')
        await delay(500)
    }
    document.body = "AHHAHAHAHAHA"
}
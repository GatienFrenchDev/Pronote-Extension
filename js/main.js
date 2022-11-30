const params = new URLSearchParams(window.location.search)
const data = JSON.parse(decodeURI(params.get("d")))
const infos = JSON.parse(decodeURI(params.get("i")))


document.getElementById('dark-mode').addEventListener(("click"), () =>{
    toogledarkmode()
})

document.getElementById('grd-titre').innerText = `Profil de ${infos.nom}`
document.getElementById('la-moyenne').innerHTML = `Moyenne Générale de l'élève<br>${infos.moyenne}/20`
document.getElementById('la-moyenne-classe').innerHTML = `Moyenne Générale de la classe<br>${infos.moyenne_g}/20`


let data_moyenne = []
let nom_moyennes = []
let moyennes = []
for (const [key, value] of Object.entries(data)) {
    data_moyenne.push({
        "note": parseFloat(value[0]),
        "nom": key
    })
}

data_moyenne.sort((a, b) => a.note - b.note)

data_moyenne.forEach(value =>{
    moyennes.push(value["note"])
    nom_moyennes.push(value["nom"])
})

const canvas_ = document.getElementById('moyenne-g')
const ctx = canvas_.getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: nom_moyennes,
        datasets: [{
            data: moyennes,
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1.5
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 20
            }
        }
    }
});

Object.keys(data).forEach(key =>{
    let notes = data[key]
    let average = notes.shift()

    const div = document.createElement('div')
    div.classList.add('cellule')
    const grille = document.getElementById('grille-principale')
    const titre_matière = document.createElement('h4')
    titre_matière.appendChild(document.createTextNode(`${key}` + ` - [${average}]`))
    const canvas = document.createElement('canvas')
    div.appendChild(titre_matière)
    div.appendChild(canvas)
    grille.appendChild(div)
    
    let data_eleve = []
    let data_classe = []
    let label = []
    notes.forEach(element =>{
        data_eleve.push(element[0])
        data_classe.push(element[2])
        label.push(element[1])
    })
    if(data_eleve.length == 1 && data_classe.length == 1){
        label.push(label[0])
        data_eleve.push(data_eleve[0])
        data_classe.push(data_classe[0])
    }

    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label.reverse(),
            datasets: [{
                label: "Note de l'élève",
                data: data_eleve.reverse(),
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1.5
            },
            {
                label: "Note moyenne de la classe",
                data: data_classe.reverse(),
                backgroundColor: [
                    '#7d7d7d',
                ],
                borderColor: [
                    '#7d7d7d',
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20
                }
            }
        }
    });
})



function toogledarkmode() {
    const btn = document.getElementById("dark-mode")
    if (btn.classList.contains('dark')) {
        btn.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`
        btn.classList.remove('dark')
        btn.classList.add('light')
    }
    else {
        btn.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`
        btn.classList.remove('light')
        btn.classList.add('dark')
    }
    document.body.classList.toggle('light')
    document.querySelectorAll("h3").forEach((e) => {
        e.classList.toggle('light')
    })
    document.querySelectorAll("h4").forEach((e) => {
        e.classList.toggle('light')
    })
}
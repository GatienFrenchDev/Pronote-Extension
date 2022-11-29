const params = new URLSearchParams(window.location.search)
const data = JSON.parse(decodeURI(params.get("d")))
const infos = JSON.parse(decodeURI(params.get("i")))
// console.log(localStorage.getItem("data"))


document.getElementById('dark-mode').addEventListener(("click"), () =>{
    toogledarkmode()
})

document.getElementById('grd-titre').innerText = `Profil de ${infos.nom}`
document.getElementById('la-moyenne').innerHTML = `Moyenne Générale de l'élève<br>${infos.moyenne_g}/20`
document.getElementById('la-moyenne-classe').innerHTML = `Moyenne Générale de la classe<br>${infos.moyenne_g}/20`


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
const fs = require('fs')
const PATH="oglasi.json"

let procitajPodatke = () => {
    let oglasi = fs.readFileSync(PATH,(err,data) => {
        if(err) throw err;
        return data;
    })
    return JSON.parse(oglasi)
}

let snimiOglase = (data) => {
    fs.writeFileSync(PATH,JSON.stringify(data))
}

exports.sviOglasi = () => {
    return procitajPodatke()
}

exports.kreirajOglas = (kat,datum,cena,tekst,oznake,email) => {
    let oglas = {
        "id": 0,
        "kategorija": kat,
        "datumIsteka": datum,
        "cena":cena,
        "tekstOglasa":tekst,
        "oznaka":oznake,
        "email":email
    };
    return oglas
}

exports.addOglas = (novOglas) => {
    let id=1
    let oglasi=this.sviOglasi()
    if(oglasi.length>0){
        id=oglasi[oglasi.length-1].id+1
    }
    novOglas.id=id;
    oglasi.push(novOglas)
    snimiOglase(oglasi)
}


exports.getOglas = (id) => {
    return this.sviOglasi().find(oglas=>oglas.id==id)
}

exports.izmeniOglas = (body) => {
    let oglasi=this.sviOglasi()
    let index=oglasi.indexOf(oglasi.find(o=>o.id==body.id))
    oglasi[index]=body
    snimiOglase(oglasi)
}

exports.getOglasByKategorija = (kategorija) => {
    return this.sviOglasi().filter(oglas=>oglas.kategorija==kategorija)
}

exports.deleteOglas = (id) => {
    snimiOglase(this.sviOglasi().filter(oglas=>oglas.id!=id))
}
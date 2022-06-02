const express = require("express")
const fs = require("fs")
const app = express()
const path = require('path')
const axios = require('axios')
const { izmeniOglas } = require("../OglasiServis/node_modules/radoglasi-modul/rad-sa-oglasima")
const { response } = require("express")
const port = 5000

app.use(express.urlencoded({extended : false}))
app.use(express.json())

let procitajPogled = (naziv) =>{
    return fs.readFileSync(path.join(__dirname+"/view/"+naziv+".html"),"utf-8")
}

app.get("/",(request,response)=>{
    response.send(procitajPogled("index"))
})

app.get("/svioglasi",(req,res)=>{
    axios.get("http://localhost:3000/svioglasi")
    .then(response=>{
        let prikaz=""
        response.data.forEach(element => {
            prikaz+=`<tr>
            <td>${element.id}</td>
            <td>${element.kategorija}</td>
            <td>${element.datumIsteka}</td>
            <td>${element.tekstOglasa}</td>
            <td>${element.cena}</td>
            <td>${element.oznaka}</td>
            <td>${element.email}</td>
            <td><a href="/izmeni/${element.id}">Izmeni</a></td>
            <td><a href="/detaljnije/${element.id}">Detaljnije</a></td>
            <td><a href="/obrisi/${element.id}">Obrisi</a></td>
        </tr>`;
        })

        res.send(procitajPogled("svioglasi").replace("#{data}",prikaz))
    })
    .catch(error=>{
        console.log(error)
    })
})

app.get("/izmeni/:id",(req,res) => {
    axios.get(`http://localhost:3000/getoglasbyid/${req.params["id"]}`)
    
    .then(response=>{
        console.log(response.data)
        let prikaz="";
            prikaz+=`
            <h1>Trenutno menjate oglas pod IDjem:${response.data.id} </h1>
            <form action="/izmenioglas" method="post">
            <tr>
            <td><input type="text" name="id" value="${response.data.id}" hidden></td>
            <td><input type="text" name="kategorija" value="${response.data.kategorija}"></td>
            <td><input type="text" name="datumIsteka" value="${response.data.datumIsteka}"></td>
            <td><input type="text" name="tekstOglasa" value="${response.data.tekstOglasa}"></td>
            <td><input type="text" name="cena" value="${response.data.cena}"></td>
            <td><input type="text" name="oznaka" value="${response.data.oznaka}"></td>
            <td><input type="text" name="email" value="${response.data.email}"></td>
            <td><button type="submit">Sacuvaj oglas</button></td>
            </tr>
            </form>
            `;
        res.send(procitajPogled("svioglasi").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    });

})


app.get("/idiizmena",(req,res)=>{
    res.send(procitajPogled("formadodavanje").replace("#{ruta}","/izmenioglas"))
    
})

app.post("/izmenioglas",(req,res)=>{
    console.log(req.body.kategorija)
    console.log(req.body.cena)
        
    axios.put(`http://localhost:3000/izmenioglas/${req.body.id}`,{
        id:req.body.id,
        kategorija:req.body.kategorija,
        datumIsteka:req.body.datumIsteka,
        cena:req.body.cena,
        tekstOglasa:req.body.tekstOglasa,
        oznaka:req.body.oznaka,
        email:req.body.email
    })
    res.redirect("/svioglasi")
})

app.get("/obrisi/:id",(req,res) => {
    axios.delete(`http://localhost:3000/deleteoglas/${req.params["id"]}`)
    res.redirect("/svioglasi")
})

app.get("/dodajoglas",(req,res)=>{
    res.send(procitajPogled("formadodavanje").replace("#{ruta}","/snimioglas"))
})


app.post("/snimioglas",(req,res)=>{
    axios.post("http://localhost:3000/addoglas",{
        kategorija:req.body.kat,
        datumIsteka:req.body.datumIsteka,
        cena:req.body.cena,
        tekstOglasa:req.body.tekstOglasa,
        oznaka:req.body.oznaka,
        email:req.body.email
    })
    res.redirect("/svioglasi")
})

app.get("/detaljnije/:id",(req,res)=>{
    axios.get(`http://localhost:3000/getoglasbyid/${req.params["id"]}`)
    .then(response=>{
        let prikaz="";
            prikaz+=`<tr>
            <td>${response.data.id}</td>
            <td>${response.data.kategorija}</td>
            <td>${response.data.datumIsteka}</td>
            <td>${response.data.cena}</td>
            <td>${response.data.tekstOglasa}</td>
            <td>${response.data.oznaka}</td>
            <td>${response.data.email}</td>
            <td><a href="/obrisi/${response.data.id}">Obrisi</a></td>
        </tr>`;
        res.send(procitajPogled("svioglasi").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    });
});

app.post("/filtrirajoglasezakategoriju",(req,res)=>{
    axios.get(`http://localhost:3000/getoglasbykategorija?kategorija=${req.body.kategorija}`)
    .then(response=>{
        let prikaz=""
        response.data.forEach(element => {
            prikaz+=`<tr>
            <td>${element.id}</td>
            <td>${element.kategorija}</td>
            <td>${element.datumIsteka}</td>
            <td>${element.tekstOglasa}</td>
            <td>${element.cena}</td>
            <td>${element.oznaka}</td>
            <td>${element.email}</td>
            <td><a href="/izmeni/${element.id}">Izmeni</a></td>
            <td><a href="/detaljnije/${element.id}">Detaljnije</a></td>
            <td><a href="/obrisi/${element.id}">Obrisi</a></td>
        </tr>`;
        })

        res.send(procitajPogled("svioglasi").replace("#{data}",prikaz))
    })
});


app.listen(port,()=>{console.log(`Klijent je na portu ${port}`)})
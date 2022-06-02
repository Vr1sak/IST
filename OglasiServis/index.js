var express = require('express')
var oglasServis = require('radoglasi-modul')
var app = express()
const port = 3000

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get('/',(request,response)=>{
    response.send("Server radi")
})

app.get('/svioglasi',(request,response)=>{
    response.send(oglasServis.sviOglasi())
})

app.post('/addoglas',(request,response)=>{
    oglasServis.addOglas(request.body)
    response.end("OK")
})

app.put('/izmenioglas/:id',(request,response)=>{
    console.log("Adasdasd")
    console.log(request.body)
    console.log(request.body.id)
    console.log(request.params.id)
    if(request.body.id==request.params.id){
        oglasServis.izmeniOglas(request.body)
    }
    response.send("OK")
})

app.delete('/deleteoglas/:id',(request,response)=>{
    oglasServis.deleteOglas(request.params["id"])
    response.end("OK")
})

app.get('/getoglasbykategorija',(request,response)=>{
    response.send(oglasServis.getOglasByKategorija(request.query["kategorija"]))
})

app.get('/getoglasbyid/:id',(request,response)=>{
    console.log(request.params["id"])
    response.send(oglasServis.getOglas(request.params["id"]))
})

app.listen(port, () => {
    console.log(`Startovan server na portu ${port}`)
})
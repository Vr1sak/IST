const test = require('radoglasi-modul')

let oznake=["12","123"]
let mejlovi=["333","444"]

// Oglas o1 = new Oglas()

let o1 = test.kreirajOglas("Alat","3/3/2022",2000,"aaa",oznake,mejlovi)
let o2 = test.kreirajOglas("Stan","6/4/2022",2000,"bbb",oznake,mejlovi)
let o3 = test.kreirajOglas("Kuca","5/6/2022",2000,"ccc",oznake,mejlovi)

test.addOglas(o1)
test.addOglas(o2)
test.addOglas(o3)

console.log(test.sviOglasi())

test.deleteOglas(2)

console.log(test.sviOglasi())
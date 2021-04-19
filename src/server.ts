import express from "express";

const app = express()

app.get('/', (req,res)=>{
return res.json({
    message: "olá nlw"})
}) 

app.post('/', (req,res) =>{
    return res.json({
    message: "dados salvo com sucesso"
    })
})


app.listen(3000, ()=> console.log("__________Server is running on port 3000"));
const express = require('express')
const mysql = require('mysql2')
const cors = require("cors");
const bodyParser=require('body-parser')
const app = express()

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pravlika123@",
    database:"bookdb1"
})

app.get("/books",(req,res)=>{
    db.query("SELECT * FROM books",(err, data)=>{
        if(err) return res.json(err)
        return res.json(data) 
        
    })
})

app.post("/create", (req, res) => {
    const name= req.body.name;
    const detials = req.body.details;

    db.query("INSERT INTO books (name, details) VALUES (? ,?)",
    [name, detials],
    
    (err,data)=>{
        if(err) return res.json(err)
        return res.json(data) 
    }
    )
});
 
app.put("/update",(req,res)=>{
    const id=req.body.id
    const details = req.body.details 
    db.query("UPDATE books SET details=? WHERE id=? ",[details, id],(err,result)=>{
        if (err) console.log(err)
        res.send(result)
    })
})


app.delete("/delete/:id",(req,res)=>{
    const id= req.params.id 
    db.query('DELETE FROM  books WHERE id = ?', id,(err,data)=>{
        if(err) return console.log(err)
        return res.send(data)
        
    })
}
)
  
app.listen(3001, () => {
    console.log("listening on http://localhost:  3000!!");
})
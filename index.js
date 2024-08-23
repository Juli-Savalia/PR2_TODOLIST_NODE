const express = require('express')

const app = express();

const port = 8000;

let data = [];

app.use(express.urlencoded());

app.set('view engine','ejs')

app.get('/',(req,res) => {
    return res.render('table',{
        users : data
    })
})

app.get('/add',(req,res) => {
    return res.render('form')
})

app.post('/insertRecord',(req,res) => {
    const {usertask,userstatus,userdate} = req.body;
    let obj = {
        id : Math.floor(Math.random()* 10000),
        task : usertask,
        Status : userstatus,
        date : userdate
    }
    data.push(obj);
    console.log("Record Successfully has been Added");
    return res.redirect('/')
})

app.get('/deleteRecord',(req,res) => {
    let id = req.query.id
    let deleteData = data.filter(val => val.id != id);
    data = deleteData;
    console.log("Record Successfully hs been Deleted");
    return res.redirect('/')
})

app.get('/editRecord',(req,res) => {
    let id = req.query.id
    let editData = data.find(val => val.id == id);
    // console.log(editData);
    return res.render('edit',{
        editData
    })    
})

app.post('/updateRecord',(req,res) => {
    let id = req.body.id;
    let task = req.body.usertask;
    let Status = req.body.userstatus;
    let date = req.body.userdate;
    console.log(id,task,Status,date);
    
    let r = data.map((val) => {
        if(val.id == id){
            val.task = task;
            val.Status = Status;
            val.date = date;
        }
        return val;
    })
    console.log(r);
    
    data = r
    console.log("Record has been successfully updated...");
    return res.redirect('/')
});

app.listen(port,(err) => {
    if(err){  
        console.log(err);
        return false;
    }
    console.log(`server has been started on your port : ${port}`);
})
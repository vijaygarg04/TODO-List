const express=require('express');
const app=express();
const fs=require('fs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
res.sendFile('index.html')

});
app.get('/json',function(req,res){
    var content='';
    fs.readFile('data.txt','utf-8',function(err,data){
        if(err){

        }
            content=data;
            res.setHeader('Content-type','application/json');
        console.log("read" +data);

        res.send(content);
        });
});

app.post('/json',function(req,res){
    var data=req.body.json;
    console.log(data);
    fs.writeFile('./data.txt',data,function(err){
        if(err){
            console.log('error occured',err);
        }
        res.send('');
    });

});
app.listen(3000,function(){
    console.log('server started');

})

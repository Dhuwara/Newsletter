const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express() 
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))
app.get('/',(req,res)=>{
    console.log('servermis running on port 3000')
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',(req,res)=>{
const firstName= req.body.fName
const secondName= req.body.lName
const email= req.body.email
console.log(firstName,secondName,email)
const data={
    members:[
        {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:secondName,
        }
    }
]
}
const jsonData = JSON.stringify(data)

const url = "https://us11.api.mailchimp.com/3.0/lists/68bfd9420f"

const options = {
    method:"POST",
    auth:"dhuwa:a52ef3db0e9027e2ad37c645236152b2a-us11"
}

const request = https.request(url,options,(response=>{
    if(response.statusCode === 200){
        res.sendFile(__dirname +'/success.html')
    }else{
        res.sendFile(__dirname + '/failure.html')
    }
    response.on("data",(data)=>{
        console.log(JSON.parse(data))
    })

}))
request.write(jsonData)
request.end()
}) 

app.post('/failure',(req,res)=>{
    res.redirect('/')
})
app.listen(3000)


// 52ef3db0e9027e2ad37c645236152b2a-us11

// 68bfd9420f
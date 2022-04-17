const express = require('express')
const app = express()
const port = 3001
const bodyparser=require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(cors);

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  

app.get('/', (req, res) => {
    console.log('hello world');
  res.send('Hello World!')
});



app.post('/api/forma', (req, res)=>{
    let data = req.body;

    console.log('data: ' , data)

    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: 'rsrsingh820@gmail.com',
            pass: 'i want you back'
        }
  
    });
  
    let mailOptions={
        from: data.userEmail,
        to: 'rsrsingh820@gmail.com',
        subject: 'Message from: '+ (data.userName),
        html: ` <h3>Information</h3><ul><li> Name: ${data.userName}</li><li>Email: ${data.userEmail}</li><li>Phone: ${data.userPhone}</li></ul><h3>Message: </h3><p> ${data.userMessage}</p> `        
        
        
    };
  

    smtpTransport.sendMail(mailOptions, (err, data) => {
        if(err){
            res.json({
                status:"err"
            }) 
            console.log(err)
            }
            else {
                res.json({
                    status: "success"
         })
         console.log("Email Sent" + data.response)
        }
    });

  
 smtpTransport.close();
  
  });

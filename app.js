const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017"


app.use(express.static("./public"));
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.post("/",(req,res)=>{
    console.log(req.body);
    var phone = req.body.phone;
    var otp = req.body.otp;
    console.log(phone+" "+otp);
    connect();
    async function connect(){
        const client = new MongoClient(uri)
        try{
            await client.connect();
            const db = client.db("data");
            console.log("connected to database ",db.databaseName);
            const collection = await db.collections();
            //collection.forEach(c=>console.log(c.collectionName));
            const phones = db.collection("phones");
            /*const insertcursor = await phones.insertMany([
                {
                    "phone" : "9102162522",
                    "otp" : "123456"

                },
                {
                    "phone" : "7004147665",
                    "otp" : "654321"
                }
            ])
            console.log(insertcursor.insertedCount);*/
            //const searchCursor = await employees.find({"name": "Hussein"});
            if(otp=="0"){
                const searchCursor = await phones.count({"phone": phone},{limit:1});
                var a = 0;
                console.log("in");
                // while (await searchCursor.hasNext()){
                //     console.log(await searchCursor.next())  
                //     a= a+1; 
                // }
                if(searchCursor==0){
                    res.send("unsuccessful")
                }else{
                    var digits = "0123456789";
                    let OTP = "";
                    for(let i = 0;i<6;i++){
                        OTP +=digits[Math.floor(Math.random()*10)];
                    }
                    phones.updateOne({"phone": phone}, {"$set" : {"otp" : OTP}})
                    res.send(OTP);
                }
            }else{
                const searchCursor = await phones.find({"phone": phone, "otp" : otp});
                var a = 0;
                while (await searchCursor.hasNext()){
                    console.log(await searchCursor.next())  
                    a= a+1;
                }
                //console.log(a);
                if(a==0){
                    res.send("unsuccessful");
                }else{
                    res.send("success");
                }
            }
        }
        catch(error){
            console.error('Something bad happened')

        }finally{
            //client.close();

        }


    }

})


app.listen(8080, '127.0.0.1',()=>{
    console.log("Listening on port 8080")
})
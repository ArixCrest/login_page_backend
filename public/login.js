const loginbtn = document.getElementById("loginbutton")
const otpbtn = document.getElementById("otpbutton");


loginbtn.addEventListener("click",(e)=> {
    e.preventDefault;
    var phn = document.getElementById("phone").value;
    var otp = document.getElementById("otp").value;
    let size = phn.length;
    if(size>10 || size<10){
      alert("Please enter a 10 digit number!");
    }else{
        let formData = {
            phone: phn,
            otp: otp,
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST","/");
        xhr.setRequestHeader("content-type","application/json");
        xhr.onload = function(){
            console.log(xhr.responseText);
            if(xhr.responseText=="success"){
                window.location.href = "contact.html";
                window.location.replace = "contact.html";
            }else{
                alert("Wrong phone no or OTP")
            }
        }
        xhr.send(JSON.stringify(formData));
    }
})

otpbtn.addEventListener("click",(eve)=>{
    eve.preventDefault;
    var phn = document.getElementById("phone").value;
    let size = phn.length;
    if(size>10 || size<10){
      alert("Invalid Number!");
    }else{
        //alert("otp sent successfully");
        var otp = "0";
        let formData = {
            phone: phn,
            otp: otp,
        }
        let xhr2 = new XMLHttpRequest();
        xhr2.open("POST","/");
        xhr2.setRequestHeader("content-type","application/json");
        xhr2.onload = function(){
            console.log(xhr2.responseText);
            if(xhr2.responseText=="unsuccessful"){
                alert("Invalid No")
            }else{
                alert("Your OTP is: " + xhr2.responseText)
            }
        }
        xhr2.send(JSON.stringify(formData));
    }
})

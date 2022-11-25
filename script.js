// Form validation function

//
function validateLoanAmount(){
    let loanAmount = document.getElementById('amount').value;
    let loanAmountCheck = /^[0-9]{1,9}$/;
    if (loanAmount != "" && loanAmount > 3 && loanAmountCheck.test(loanAmount)){
        document.getElementById('amountError').innerHTML = "";
        return true;
    } 
        document.getElementById('amountError').innerHTML = "* Amount Must Be Within 9 Digits Only";
        return false;


}


    function validateName(){
        let fullName = document.getElementById('name').value;
        let fullNameCheck = /^[A-Za-z ]{3,50}$/;
        if(fullName!="" && fullName.length>3 && fullNameCheck.test(fullName))  {
            document.getElementById('nameError').innerHTML = "";
            return true;
        }

            document.getElementById('nameError').innerHTML = "Invalid Name";
            return false;

      
    }
    
    function validateEmail(){
        let email = document.getElementById('email').value;
        let emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email.trim()!="" && email.length>3 && emailCheck.test(email) ) {
            document.getElementById('emailError').innerHTML = "";
            return true;
        }
            document.getElementById('emailError').innerHTML = "Invalid Email";
            return false;

       
    }
    
    function validatePAN(){
        let pan = document.getElementById('pan').value;
        let panCheck = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
        if (pan.length != "" && pan.length > 3 &&  panCheck.test(pan)){
            document.getElementById('panError').innerHTML = "";
            return true;
        } 
            document.getElementById('panError').innerHTML = "Invalid PAN Number";
            return false;
        

    }

    function validate(){
       // console.log("document", document.forms["Myform"])

        const name = validateName();
        const email = validateEmail();
        const PAN = validatePAN();
        const LA= validateLoanAmount();
        console.log(name,email,PAN,LA);
        if(name && email && PAN && LA){
            return true;
        }
        return false;

    }

// OTP generator
function generateOTP(min, max){
    let diff = max - min;
    let rand = Math.floor((Math.random())* diff);
    rand = rand + min;
    return rand;
}

// convert amount number to words
function amountToWords(){
    let amountInput = document.getElementById('amount').value;
    let oneToTwenty = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ',
        'Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    let tenth = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

    if(amountInput.toString().length > 9){
        document.getElementById('amountWords').innerHTML = "Value exceeds its limit..!";
    } else if (amountInput.toString().length <=9 && amountInput.toString().length > 0){
        let number = ('000000000'+amountInput).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

        let words = number[1] != 0 ? (oneToTwenty[Number(number[1]) ] || (tenth[number[1][0]] +' '+ oneToTwenty[number[1][1]]))+' Crore ': '';
        words += number[2] != 0 ?  (oneToTwenty[Number(number[2])] || (tenth[number[2][0]] +' '+ oneToTwenty[number[2][1]]))+' Lakh '  : '';
        words += number[3] != 0 ?  (oneToTwenty[Number(number[3])] || (tenth[number[3][0]] +' '+ oneToTwenty[number[3][1]]))+' Thousand ' : '';
        words += number[4] != 0 ? (oneToTwenty[Number(number[4])] || (tenth[number[4][0]] +' '+ oneToTwenty[number[4][1]]))+' Hundred ': '';
        words += number[5] != 0 ? ((words != '') ? 'and ' : '') + (oneToTwenty[Number(number[5])] || (tenth[number[5][0]] +' '+ oneToTwenty[number[5][1]])) + '': '';
        
        document.getElementById('amountWords').innerHTML = "Rs. "+ words;
    } 
    else {
        document.getElementById('amountWords').innerHTML = "";
    }
}
// Get name and email values from url
function URLParams(){
    let parameters = window.location.search;
    let urlParams = new URLSearchParams(parameters);
    let fullName = urlParams.get('name');
    let email = urlParams.get('email');
    let nameArray = fullName.split(" ");
    let firstName = nameArray[0];
    document.getElementById('userName').innerHTML = firstName;
    document.getElementById('displayEmail').innerHTML = email;

}
// Generate OTP on verifyOTP page
function otpVerification(){
    window.otp = generateOTP(1000,9999);
    window.count = 3;
    document.getElementById('counterMessage').innerHTML = " "+count+" attempts left."
    console.log("Verification Code : "+otp);
}
// Verify OTP on verifyOTP page
function verifyOTP(){
    let inputOtp = document.getElementById('otp').value;

    if(otp == inputOtp){
        window.location.replace("https://pixel6.co/");
    } else if(count==1) {
        window.location.replace("https://pixel6.co/404");
    }else {
        if(document.getElementById('otp').value === ""){
           count;
        }else{
            count--;
        }
        document.getElementById('counterMessage').innerHTML = " "+count+" attempts left."
    }

}



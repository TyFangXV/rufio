# Privacy
<br>

 <font size=5>What all things are encrypted</font>
<br>
     
        * access and refresh  token to the server
        * the users guild id
        * any private information related to the user
        
<br>
<br>
    <font size=5>How encrypting and decryption will work</font>
<br>

        * The client and the server will share a secret key

        * Any information that is encrypted will be encrypted using the secret key

        * Each piece of information will have a time validity (in seconds) that will be used to decrypt the information; if the time validity is over, the information will be considered as invalid and will be discarded

        * All inbound and outbound request will be handled by ngix 

<br>
<br>
    <font size=5>Usage of private information</font>
<br>
    
    * No private information about the user will be shared with any third party 

    * All private information will be encrypted using the secret key

    * No information will be used for targeting purposes


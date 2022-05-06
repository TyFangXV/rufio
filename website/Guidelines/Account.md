# Guide on how Accounts are created and managed

<br/>

> ## How An Account is Created
 the following steps are required to create an account:
 * Create an Application in discord developer page
    * Create an OAuth2 Application
    * Set the redirect url to http://localhost:3000/auth/discord/callback
    * Get the Client ID and Client Secret
    * Save the Client ID and Client Secret in the api/.env file
    * Access the follow things 
        * Email
        * Username
        * Avatar
        * Server 

 <br/>

 * Handle the callback url
    * Get the code from the url
    * send it back to the client 
    * make the client send the code to the server so that the server can send the code to the appropriate client
    * save the tokens locally 
    
 <br/>

  * Getting the user information
    * Send the access token to the server after encrypting it 
    * The server will send the user information to the client and save it in a global state 
    * **It's best to not save the user info locally as the user can change their username or email**

 <br/>

 - - -
 > ## Why Can't the client handle the callback url?
 
  **For security reasons :-**

* The user can see the applications Client Secret and other necessary information that may be dangerous if seen by the client

 <br/>

 - - -
> ## why does the website need to know the servers im in?

<br>

    * To know which server a challenge or a game is hosted in

<br>

    * To let the discord bot know which server to join and add the nessessary channels for a game/challenge
 
<br>

    * To let participants know which server to join 

<br/>

   

 


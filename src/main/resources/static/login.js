$(function(){
    $('#registerBtn').on('click',function(){
        $('#register').toggleClass('hidden');
    })

    $('#loginBtn').on('click',function(){
       validateInput();
    })
    const DBuser = "testuser";
    const DBpass = "pass1234";

  //get User Input for login
  function validateInput(){
    let username = $('#username').val();
    let password = $('#password').val();
    console.log(username + password);
    if(username == DBuser && password == DBpass){
        $(window).attr('location','http://localhost:8080/home')

    }else if(
        username != DBuser || password !=DBpass 
        || !username || !password
    ){
        let message = "Username or Password is not valid, please try again.";
        $('#messages').html(message);  
    }
  } 
  // registration prozess
  function registerUser(){
    let newUser = $('#regUser').val();
    let newPw = $('#resPw').val(); 
    if(newUser && newPw){
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/create',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                name: $('#newTask').val(),
                active: true
            }),
            success: function(task){
                console.log(task);
                $("#todos").append(createTemplate(task.id,task.name));
            }
        });
    }

  
 
}})
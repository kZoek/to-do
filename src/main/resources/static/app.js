
$(function() {

    getMyTasks();
});
    // get all Tasks from BD
    function getMyTasks(){
        $.ajax({
            type:'GET',
            url: "http://localhost:8080/api/all",
            dataType: 'json',
            statusCode: {
                200: function(response) {
                    $.each(response,function(i){
                        console.log(response[i]);
                        $("#todos").append(createTemplate(response[i].id,response[i].name));
                    })
                }
            }

        })
    }
    //create new Task
    function createNewTask(){
        console.log('clicked')
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

        })
    }

    //Template for Todo List
    function createTemplate(id,content){
        return `
         <ion-item>
         <input id="todoItem" type="hidden" value="`+ id +`" >
             <span>
                <ion-checkbox id="checkbox" onclick="checkTodo()" slot="start" [indeterminate]="true"></ion-checkbox>
             </span>
             <ion-label id="content">` + content + `</ion-label>
              
            <ion-input id="editField">` + content + `</ion-input>
             
             <ion-icon id="editTask" onclick="getTodoId()" class="edit" name="pencil-outline"></ion-icon>
             <ion-icon id="deleteTask" name="trash-outline"></ion-icon>
            </ion-item>
            `
        ;
    }

// Todo Status to send to DB
    function checkTodo(){
        //false(check is on)
       // console.log($("#checkbox").prop('checked') ? false : true)
        // let isChecked = $("#checkbox").prop('checked') ? false : true;
        // let id = $('#todoItem').val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/checkTodo',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: $('#todoItem').val(),
                checked: $("#checkbox").prop('checked') ? false : true
            }),
            success: function(TodoStatus){
                console.log(TodoStatus);

            }

        })
    }
// Edit existing todo
// get ID from Todo
// toggle with pencil the ediging field
function getTodoId(){
    let i = true;
    $('#content').hide();
    $('#editField').show();
    if( i == true ){
        $('#editField').hide();
        i = false;
    }
    
    
    
}


    function editTodo(){
        $('#content').html([html], [append])
    }

    
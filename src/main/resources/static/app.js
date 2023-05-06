
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
                        $("#todos").append(createTemplate(response[i].id,response[i].name,response[i].checked));
                    })
                   $('ion-checkbox').on('ionChange',function(event){
                    console.log(event['target']);
                    let checkbox = event['target'];
                    checkTodo($(checkbox).closest('ion-item').attr('id'),$(checkbox).prop('checked'))
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
    function createTemplate(id,content,checkStatus){
        return `
         <ion-item id="`+ id +`">
             <span>
                <ion-checkbox id="checkbox" aria-label="Label" slot="start" checked="`+ checkStatus +`"></ion-checkbox>
             </span>
              <ion-label id="content">` + content + `</ion-label>
                           
             <ion-icon id="editTask" class="edit" name="pencil-outline"></ion-icon>
             <ion-icon id="deleteTask" name="trash-outline"></ion-icon>
        </ion-item>
             `
            ;
        
    }
    
    // Eventhandler for click actions
    function handleTodoClick(element, eventType) {
        let id = element.attr('id');
        // let isChecked = element.find('#checkbox').prop('checked');
        let contentElement = element.find('#content'); // get the ion-label element with id="content"
        let content = contentElement.length ? contentElement.text() : ''; // check if the ion-label element exists and get its text content
      
        if (eventType === 'edit') {
          console.log('edit click: ' + id + ', content: ' + content);
          // Add your editTodo() function call here
          editTodo(content);
        } else if (eventType === 'delete') {
          console.log('delete click: ' + id + ', content: ' + content);
          // Add your deleteTodo() function call here
          deleteTodo(id);
        }
      }
      
      
      $(document).on('click', '#todos ion-item #editTask', function(event) {
        event.stopPropagation();
        handleTodoClick($(this).closest('ion-item'), 'edit');
      });
      
      $(document).on('click', '#todos ion-item #deleteTask', function(event) {
        event.stopPropagation();
        handleTodoClick($(this).closest('ion-item'), 'delete');
      });

    
    
// update checked status of the selected Item in DB
    function checkTodo(id,isChecked){
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/api/checkTodo',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id,
                checked: isChecked
            }),
            success: function(response){
                console.log(response);
            }

        })


    }
// Edit existing todo
// toggle with pencil the ediging field

    function editTodo(content){
        console.log('clicked Pencil');
        $('#editField').toggleClass('hidden');
        $('#editField ion-card-title').html(content);
        
    }
// close window without saving changes
    function closeWindow(){
        $('#editField').toggleClass('hidden');
    }
// close window and save changes
    function saveChanges(){

        let newContent = $('#editField ion-input').val();
        // close the window
        $('#editField').toggleClass('hidden');
        // save the input 
        console.log('changes saved: ' + newContent);

    }
    
    function deleteTodo(id){
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/deleteTodo/' + id,
            success: function(response){
                console.log(response);
            }
        })
        .fail(function(status){
            console.log(status);
        })

    }


    
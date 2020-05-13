$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyCvgci0FVDDtpSfHPrlkguGOMhmtnocTJ8",
        authDomain: "fir-todo-list-tutorial-d50d4.firebaseapp.com",
        databaseURL: "https://fir-todo-list-tutorial-d50d4.firebaseio.com",
        projectId: "fir-todo-list-tutorial-d50d4",
        storageBucket: "fir-todo-list-tutorial-d50d4.appspot.com",
        messagingSenderId: "387018079140",
        appId: "1:387018079140:web:72268e6363382fab829f31",
        measurementId: "G-F48LPK1TXH"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

        // Get a reference to the database service
    var database = firebase.database();
    var current_user = "";

    // Kullanıcının üye girişi yapıp yapmadığının kontrolü ve logout işlemleri
    firebase.auth().onAuthStateChanged(function(user){

        if(user){

            current_user = user.uid; 
            console.log(current_user);

            $(".user-text").text("Mail : " + user.email);

            $("#logout").click(function(){

                firebase.auth().signOut()
                    .then(function(){
                        window.location.href = "login.html";
                    })
            })

        // Todosları database ekleme işlemleri
            $(".sendToFireBase").click(function(){

                var description = $("#description").val();
 
                firebase.database().ref().child("users").child(current_user).child("todos").push(
                    {
                        description : description,
                        completed : false 
                    }
                );

                $("#description").val(''); // todos eklendikten sonra description textbox alanın temizlenmesini sağlıyor.

            })

         // Eklenen todoları görüntüleme   
            var todoRef = firebase.database().ref().child("users/" + current_user).child("todos");
            todoRef.on("value", function(snapshot){

                var $parent = $(".todoList").children("tbody");

                $parent.html('');

                snapshot.forEach(function(item){

                    var completed = item.val().completed == true ? "checked" : "";

                    var description_elem = "<td>" + item.val().description + "</td>";
                    var completed_elem = "<td class='text-center'><input data-key='" + item.key + "' type='checkbox' class='switchery-plugin' " + completed + "/></td>";
                    var removeBtn_elem = "<td class='text-center'><button data-key='" + item.key + "' class='btn btn-danger btn-block removeBtn'>Sil</button></td>";

                    $parent.append("<tr>" + description_elem + completed_elem + removeBtn_elem + "</tr>");

                })

                $(".switchery-plugin").each(function(){
                    new Switchery(this);
                })
            });

         // Silme işlemleri
            $("body").on("click", ".removeBtn", function(){
                                 
                var $key = $(this).data("key");
             
                firebase.database().ref("users/" + current_user).child("todos").child($key).remove();

           
                $("body").on("click", ".removeBtn", function(){
                    $(".furkan").html("<b> Kayıt silindi! </b>");
                     $(".furkan").addClass("test").slideUp(1000);
                     $(".furkan").removeClass("test");


                   });

                
            });

  
        // Todo-Durum güncelleme
            $("body").on("change", ".switchery-plugin", function(){

                var $completed = $(this).prop("checked");

                var $key = $(this).data("key");

                firebase.database().ref("users/" + current_user).child("todos").child($key).child("completed").set($completed);


            })


        }

    })

})
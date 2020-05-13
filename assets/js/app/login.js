// jQuery Start
$(document).ready(function(){


    // Hangi firebase projesine gitmesini belirtiyoruz.
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

    // loginBtn butonuna basıldığında email ve password değerlerini al, aşağıdaki function çalıştır.

    $("#loginBtn").click(function(){

        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(){
                window.location.href = "index.html";
            }).catch(function(error){
                alert(error.message);
        })


    })

    // Şifre gösterme 

    $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle")); 
        if (input.attr("type") == "password")
        {
          input.attr("type", "text");
        
          $(".toggle-password").attr("data-original-title", "Şifreyi Gizle");
        }     
        else {
          input.attr("type", "password");
          $(".toggle-password").attr("data-original-title", "Şifreyi Göster");
        }
      });

      $('[data-toggle="tooltip"]').tooltip();  

     // Beni Hatırla 

      if (localStorage.chkbx && localStorage.chkbx != '') {
        $('#customCheck1').attr('checked', 'checked');
        $('#email').val(localStorage.usrname);
        $('.password-field').val(localStorage.pass);
    } else {
        $('#remember_customCheck1').removeAttr('checked');
        $('#email').val('');
        $('.password-field').val('');
    }

    $('#customCheck1').click(function() {

        if ($('#customCheck1').is(':checked')) {
            // save username and password
            localStorage.usrname = $('#email').val();
            localStorage.pass = $('.password-field').val();
            localStorage.chkbx = $('#customCheck1').val();
        } else {
            localStorage.usrname = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
        }
    });


    })      
 // jQuery End   



// JS 


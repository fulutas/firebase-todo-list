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

    // registerbtn butonuna basıldığında aşağıdaki function çalıştır.
    $("#registerBtn").click(function(){

        var email = $("#email").val();
        var password = $("#password").val();

    // Kullanıcı oluşturma; Bilgiler, email ve password'den gelecek. 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(){

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(function(){
                        window.location.href = "index.html";
                    })

            }).catch(function(error){
                alert(error.message);
        })

    })


})
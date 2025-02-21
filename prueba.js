
const conexion=mysqli_connect("localhost","root","","login");
const consulta="SELECT*FROM usuar1o where usuario='jhorts' and password='jhorts'";
const resultado=mysqli_query(conexion,consulta);

const filas=mysqli_num_rows(resultado);

if(fila){
  
    header("location:mapa.html");

}


mysqli_free_result(resultado);
mysqli_close(conexion);
const mysql = require('mysql')
        const conection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'login'
        })
        conection.connect((err) =>{
            if(err) throw err
            console.log('la coneccion funciona')
        })
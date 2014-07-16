var mysql = require('mysql');


var config = {
  user:'',
  password:'',
  host:'',
  database:''
};

var client = mysql.createConnection(config);
client.connect(function(error,results){
    if(error){
      console.log("Error connect mysql"+error.message);
    }
    console.log("Connect mysql success");
});

var mysqlCrud = {
    insert:function(client,sql,value){
        client.query(sql,value,function(err,result){
            if(err){
              console.log("Error -> "+err.message);
              client.end();
              return;
            }else{
              console.log("Inserted ->"+ result.affectedRows + "row.");
              console.log("Insert sueccss");
              res.send('Inserted ->'+ result.affectedRows + 'row.');
            }
        });
    },
    update:function(client,sql){
        client.query(sql,function(err,result){
            if(err){
              console.log("error -> "+err.message);
              client.end();
            }else{
              console.log("update success");
              res.send('update success sql -> '+sql);
            }
        });
    },
    delete:function(client,sql){
        client.query(sql,function(err,result){
            if(err){
              console.log("error -> "+err.message);
              client.end();
            }
            console.log("delete success");
            res.send('delete success sql -> '+sql);
        });
    },
    select:function(client,sql){
        client.query(sql,function(err,rows,fields){
            if(err){
                res.send('error -> '+ err.message);
            }else{
                if(rows.length>0){
                  var firstResult,resultSet='';
                  for(var i=0;i<rows.length;i++){
                    firstResult=rows[i];
                    for(var key in firstResult){
                      if(firstResult.hasOwnProperty(key)){
                        // resultSet+='key -> '+key+' value -> '+firstResult[key]+'\n';
                        // console.log('key -> '+key+' value -> '+firstResult[key]);
                      }
                    }
                  };
                }
                res.send(JSON.stringify(rows));
            }
        });
    }
};

module.exports.insert = mysqlCrud.insert;
module.exports.update = mysqlCrud.update;
module.exports.delete = mysqlCrud.delete;
module.exports.select = mysqlCrud.select;

//'insert into base_access_log set username=?,login_date=?,cancel_date=?,login_ip=?'
// ['tk大神','lognDate','cancelDate','127.0.0.1']
// "delete from base_access_log where username='tk大神'"
// 'select * from base_access_log limit 0,10'
// "update base_access_log set username='tk大神123' where username='tk大神'"
// mysqlCrud.insert(client,'insert into base_access_log set username=?,login_date=?,cancel_date=?,login_ip=?',['tk大神22222','lognDate','cancelDate','127.0.0.1']);
// });

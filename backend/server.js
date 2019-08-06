'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
var promise = require('bluebird');
var pgp = require('pg-promise')(/*options*/);
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');


var cn = {
    host: '10.2.6.125', // server name or IP address;
    port: 5432,
    database: 'nais',
    user: 'postgres',
    password: ''
};

var dn = {
  host: '10.2.6.115', // server name or IP address;
  port: 5432,
  database: 'nais',
  user: 'postgres',
  password: 'post'
};
 
var db = pgp(cn); // database instance;
var db1 = pgp(dn); // database instance;

// select and return user name from id:

if (!db){
console.log(error);
}
else{
db.one('SELECT * FROM hais where p01 like'+ "'%190454%'")
    .then(data => {
        console.log(data); // print user name;
		
    })
    .catch(error => {
        console.log(error); // print the error;
    });	
	
}
if (!db1){
  console.log(error);
  }
  else{
  db1.one('SELECT * FROM kartridj_1 where id=1')
      .then(data => {
          console.log(data); // print user name;
      
      })
      .catch(error => {
          console.log(error); // print the error;
      });	
    
  }


const API_PORT = 3001;
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
//const Search = require('../client/src/app1.js');


//##################################    Worked Code search from query ############################################################
/*
router.get("/getvalue/:input", (req, res) => {
	//var Value = require("../client/src/app1.js")
	var put0 = req.params.input.split(",");
	var put = put0[0];
	var number = put0[1];
	var put1 = "%"+put+"%";
	var put2 = "'"+put1+"'";
	var text = 'SELECT * FROM hais where p01 like' + put2;
	let datas = [];
	// Set if number 0 or more then 1//
	if (number<1){var num = 1;}
	else {var num = number; }
	// Set if number 0 or more then 1//
   db.any('SELECT * FROM hais where p07 like ' + put2 + 'OR p01 like ' + put2 + 'OR p02 like ' + put2 +'OR p03 like ' + put2 +'OR p05 like ' + put2 +'OR p06 like ' + put2 + 'limit ' + num )
  .then(data => {
	 console.log(data); // print data;
	 for (var i=0;i<data.length;i++){
		
	datas.push(data[i])	;
	
	}
    return  res.json({ success: true, data: datas})
		
    })
    .catch(error => {
        console.log(error); // print the error;
    });	
  
});
*/

/*#################################### base table name rows ####################################################################
p01     -    INventar number *
p02     -    Name of material
p02a    -    Codes type of material (computer,monitor....)
p03     -    Date
p04     -    price
p05     -    serial number 
p06     -    Plase where installed
p07     -    Name who used *
p08     -    category who used *
p09     -    empty


/*#################################### base table name rows ####################################################################
*/
//##################################    Worked Code search from query ############################################################

router.get("/getvalue/", (req, res) => {
	var {typeinventar, number, searchvalue } = req.query;
	console.log(searchvalue + ' ' + number + ' ' + typeinventar);
	//var text = 'SELECT * FROM hais where p01 like ' + ' ' +  searchvalue;
	//console.log(text);
	var input1 = searchvalue.charAt(0).toUpperCase() + searchvalue.slice(1),
	searchval1 = "%"+input1+"%",
  searchvalue2 = "'"+searchval1+"'",
  serchvalue3 = "%"+searchvalue+"%",
  serchvalue4 ="'"+serchvalue3+"'",
	searchval01 = "%"+searchvalue+"%",
	searchvalue02 = "'"+searchval01+"'",
	typeinventar1 = "'"+typeinventar+"'";

  console.log("This is typeinventar1" + ' ' + typeinventar1);
  console.log("this is searchvalue" + ' ' + searchvalue );
  console.log("This is searchvalue2" + ' ' + searchvalue2);
	
	let datas = [];
	// Set if number 0 or more then 1//
	if (number<1){var num = 1;}
	else {var num = number; }
	// Set if number 0 or more then 1//
	// Set if typeinventar not selected//
	if (typeinventar != '0' &&  typeinventar != '065' ){
    console.log ('typeinventar is not 00' + '\n'+ 'this is type inventar ' + ' ' + typeinventar)
    
var query1 = db.any('SELECT * FROM hais where (p06 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 +  ' )' + 'OR (p01 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 + ' )' + 'OR (p07 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 + ' )'  + 'OR (p02 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 + ' )' + 'OR (p03 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 + ' )' + 'OR (p05 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 + ' )' + 'OR (p06 like ' + ' ' +  searchvalue2 + ' and p02a = ' + typeinventar1 + ' )' + ' limit '  + num)

}
else if (typeinventar === '065' ){
  console.log ('typeinventar is 065' + '\n'+ 'this is type inventar ' + ' ' + typeinventar)
  
var query1 = db1.any('SELECT * FROM kartridj_1 where (Name like ' + ' ' +  searchvalue2 + ')' + 'OR (Printer like ' + ' ' +  searchvalue2 + ' )'  + 'OR (Churge like ' + ' ' +  searchvalue2 + ' )' + ' limit '  + num)

}
else {
console.log ('typeinventar is 00')
	var query1 = db.any('SELECT * FROM hais where p09 like ' +serchvalue4  + ' OR p07 like ' +searchvalue2  + 'OR p01 like ' +searchvalue2 + 'OR p01 like ' + searchvalue02 + ' OR p02 like ' +searchvalue2 + ' OR  p03 like ' +searchvalue2 + ' OR  p05 like ' +searchvalue2 + ' OR p06 like ' + searchvalue2 + 'limit ' + ' ' +  num)
	}
		// Set if typeinventar not selected//
	query1
	.then(data => {
	 console.log(data); // print data;
	 for (var i=0;i<data.length;i++){
	datas.push(data[i])	;
		}
    return  res.json({ success: true, data: datas})
	    })
    .catch(error => {
        console.log(error); // print the error;
    });	
  
});

//##################################    Worked Code search from query ############################################################

router.post("/updatevalue/", (req, res) => {
  const {id,id_1,update,name,matherial,code,date,price,serial,place,notes} = req.body;
  console.log('This is ID ' + id_1);
  console.log('This is _ID  ' + id);
  console.log('This is update ' + update.message);
  var id01 = decoder.write(id_1),
  id0 = "%"+id01+"%",
  id1 = "'"+id_1+"'",
  id2 = "'"+id+"'",
  name1 = "'"+name.message+"'",
  update1 = "'"+update.message+"'",
  matherial1 = "'"+matherial.message+"'",
  code1 = "'"+code.message+"'",
  date1 = "'"+date.message+"'",
  price1 = "'"+price.message+"'",
  serial1 = "'"+serial.message+"'",
  place1 = "'"+place.message+"'",
  notes1 = "'"+notes.message+"'";
	db.any('update hais set  p01 = '+ id1 +', p09 = '+ notes1 +', p08 = '+ update1 +', p07 = '+ name1 + ', p02 = '+ matherial1 +', p02a = '+ code1 +', p03 = '+ date1 + ', p04 = '+ price1 + ', p05 = '+ serial1 +', p06 = '+ place1 +' where id =  '+ id2).then(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true }), alert ('The data has been updated!!!!');
  });
});


//##################################    Worked Code Insert Values ############################################################
router.post("/insertvalue/", (req, res) => {
  const {id,category,name,nameMatherial} = req.body;
  console.log('This is ID ' + id);
  console.log('This is Category ' + category.message);
  console.log('This is name ' + name.message);
  var id01 = decoder.write(id),
  id0 = "%"+id01+"%",
  id1 = "'"+id +"'",
  name1 = "'"+name.message+"'",
  insert1 = "'"+category.message+"'",
  nameMath = "'"+ nameMatherial.message+"'",
  Nothing = "'"+ '' +"'";
  
  
  console.log('insert into hais (p01,p02,p02a,p03,p04,p05,p06,p07,p08,p09) values ('+id1 + ',' + nameMath+ ',' +Nothing+ ','+ Nothing+ ','+ Nothing+','+ Nothing+ ',' + Nothing + ',' + name1+ ','+ insert1 + ','+ Nothing+')');
  
	db.any('insert into hais (p01,p02,p02a,p03,p04,p05,p06,p07,p08,p09) values ('+id1 + ',' + nameMath+ ',' +Nothing+ ','+ Nothing+ ','+ '00.00'+','+ Nothing+ ',' + Nothing + ',' + name1+ ','+ insert1 + ','+ Nothing+')').then(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  
});
//##################################    Worked Code Insert Values ############################################################
//##################################    Worked Code Remove Values ############################################################
router.post("/removevalue/", (req, res) => {
  const {id} = req.body;
  console.log('This is ID ' + id);
  var id1 = "'"+id +"'";
  
	db.any('delete from hais where id = '+ id1 ).then(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  
});
//##################################    Worked Code Remove Values ############################################################




// app1end /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

import React, { Component } from 'react'
import axios from 'axios'
import './index.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');





class Search extends Component {
  
  
  state = {
    query: '',
    results: [],
	message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
	data:[],
	number:null,
	searchvalue:null,
	value:'cool'
	
	
  }

  
 //####################################### Hide show forms ###################################
 EditValue(e){
	  e.preventDefault();
	  if (!document.getElementById('Edit')){document.getElementById('ask').innerHTML = "Ви не виконали пошук!!!"}
	  else{	  
	  
	  document.getElementById('Edit').style.visibility = "";
	  }
	  }
	  
  EditDoubleValue(e){
  e.preventDefault();
  if (!document.getElementById('Edit')){document.getElementById('ask').innerHTML = "Ви не виконали пошук!!!"}
	  else{	  
  document.getElementById('Edit').style.visibility = "hidden";
	  }
	  }
  
  InsertData(e){
	    e.preventDefault();
	  if (document.getElementById('Fieldset') || document.getElementById('Edit') ) {alert('закінчіть інші дії')}	  
	  else{document.getElementById('Insert').style.visibility = "";}
      	  
  }
   InsertDoubleData(e){
  e.preventDefault();
  document.getElementById('Insert').style.visibility = "hidden";
   }
 
 
 
 
 
 
//#########################################   testing #######################################
getInfoedr = () => {
	  	   var string  = this.state.query,
		   num  = this.state.numres,
		   typ = this.state.typeinv;
		   
		   		   
		   var input2 = decoder.write(string);
		   // connects our back end code with the database
 	  axios.get("/api/getvalue/",{
      params: {
		typeinventar: typ,  
        number: num,
		searchvalue:input2}}
	  )
	     .then(data=>data.data)  
	    .then(result => 
	  	      this.setState({
		                     results: result.data
		                   							
		  	               })
	  			)
		.catch(error => {
			this.setState({
		    results1: 'Something wrong :-( Please retype '

              })
		})
	  }
//#########################################   testing #######################################
 
	  handleInputChange = (props) => {
          
	        //handleInputChange = () => {
    this.setState({
      query: this.search.value,
	  numres : this.resnum.value,
	  typeinv : this.invtype.value
    }, 
	() => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2===0) {// === 0) {
          this.getInfoedr()
		  console.log('the length = ' +  this.state.query.length )
        }
      } else if (!this.state.query) { console.log('the length = ' +  this.state.query.length )
      }
    })
  
  }
  //###############################################################   UPDATE DATA ##################################################################################
    updateDB(idToUpdate,updateNameToApply,updateToApply,updateMatherial,updateCode,updateDate,updatePrice,updateSerial,updatePlace,e){
		 e.preventDefault();
		
		       let objIdToUpdate = null;
               this.state.results.map(dat => {
               if (dat.p01 === idToUpdate) {
               objIdToUpdate = idToUpdate;
                              }
                               });
	            
				var objID = document.getElementById('ID').value;
	            let updateToApply1 = decoder.write(updateToApply);
	            let objIdToUpdate1 = decoder.write(idToUpdate.toUpperCase());
	            let updateNameToApply1 = decoder.write(updateNameToApply.charAt(0).toUpperCase() + updateNameToApply.slice(1));
                //let objIdToUpdate2 = objIdToUpdate1.substr(6,11);
                axios.post("/api/updatevalue",
	                   {
						 _id : objID,
                         id: objIdToUpdate1,
                         update: { message: updateToApply1 },
	                     name: {message :updateNameToApply1},
						 matherial: {message :updateMatherial},
						 code: {message :updateCode},
						 date: {message :updateDate},
						 price: {message :updatePrice},
						 serial: {message :updateSerial},
						 place: {message :updatePlace}
                       })
					   .then(()=>{
					
						  axios.get("/api/getvalue/",{
                                params: {
								typeinventar : '0',
                                number: 1,
		                        searchvalue: objID }} 
	                                    )
									.then(data=>alert(
									 'Запис успішно оновлено, Деталі : ' + '\n' +
									'Інвентарний :' +  data.data.data[0].p01 + '\n'+
									'ФІП :' +  data.data.data[0].p07 + '\n' +
									'Найменування :' +  data.data.data[0].p02 + '\n' +
									'Код :' +  data.data.data[0].p02a + '\n' +
									'Посада :' +  data.data.data[0].p08 + '\n'
																		
									))
									 								
						     })
	 
  };
  //###############################################################   INSERT DATA ##################################################################################
  InsertDB(InsertID,InsertCategory,InsertName,InsertNameMatherial,e){
		 e.preventDefault();
		
	            
	            //let InsertToApply1 = e(InsertToApply);
	            //let objIdToInsert1 = decoder.write(idToInsert.toUpperCase());
	            //let InsertNameToApply1 = decoder.write(InsertNameToApply.toUpperCase());
                
                       axios.post("/api/insertvalue",
	                   {
                         id: InsertID,
                         category: { message: InsertCategory },
	                     name: {message :InsertName},
						 nameMatherial : {message:InsertNameMatherial}
                       })
					   .then(()=>{
					
						  axios.get("/api/getvalue/",{
                                params: {
								typeinventar : '0',
                                number: 1,
		                        searchvalue: InsertID }} 
	                                    )
									.then(data=>alert(
									 'Запис успішно записано, Деталі : ' + '\n' +
									'Інвентарний :' +  data.data.data[0].p01 + '\n'+
									'ФІП :' +  data.data.data[0].p07 + '\n' +
									'Найменування :' +  data.data.data[0].p02 + '\n' +
									'Код :' +  data.data.data[0].p02a + '\n' +
									'Посада :' +  data.data.data[0].p08 + '\n'
																		
									))
									 								
						     })
							 .then(()=>{
							 document.getElementById('Insert').style.visibility = "hidden";
							 })
							 .catch(error => {
			                   alert(error);
                                		})
	 
  };
  
    //###############################################################   DELETE DATA ##################################################################################
  
  DeleteDB(updateMatherial,e){
		 e.preventDefault();
			            
	           var objID = document.getElementById('ID').value,
			   objINV = document.getElementById('Text').value;
				
               confirmAlert({
                  title: 'Підтвердження видалення ',
                  message: 'ви впевнені, що хочете видалити запис?' + '\n' +  ' ID : ' + objID + ' ' + 'назва' + ' ' + objINV  + ' ' + updateMatherial, 
                  buttons: [
                           {
                           label: 'Так',
                           onClick: function(){
							  
					     axios.post("/api/removevalue",
	                   {
                         id: objID
                       })
					   .then(()=>{     
						  axios.get("/api/getvalue/",{
                                params: {
								typeinventar : '0',
                                number: 1,
		                        searchvalue: objID }} 
	                                    )
									.then(data=>{
								if (data.data.data[0].length>0) {alert( 'Запис Не видалено ' )}
								else {alert( 'Запис успішно видалено! ')}
								})
								   })
							 .then(()=>{
								 document.getElementById('Edit').style.visibility = "hidden";
								 })
								 .then(()=>{
								 document.getElementById('INPUT').value = ' blablabla';
								 })
							 .catch(error => {
			                   alert('Записів не знайдено! Видалення пройшло успішно!');
                                		}) 
							       }},
                           {
                           label: 'Ні',
                           onClick: () => alert('Запис не видалено!')
                           }
                             ]
                              })

  };
  
   handleChangeSelect(event) {
	   this.handleChangeSelect = this.handleChangeSelect.bind(this)  
    this.setState({value: event.target.value});
  }
  Event=()=>{
	
/*confirmAlert({
      title: 'До відома',
      message: 'Як користуватись : ' + '\n' + 'одинарний клік  - увімкнення форми додавання записів ' + '\n' + 'подвійний клік  - вимкнення форми додавання записів ',
      buttons: [
        {
          label: 'Зрозуміло',
          //onClick: () => alert('Click Yes')
        }
              ]
    })
*/
	document.getElementById('getInfo').style.visibility = 'visible';
	 this.setState({text: 'клік-увімкнення : подвійний клік-вимкнення'})
		  }
  EventOut=()=>{
	  document.getElementById('getInfo').style.visibility = 'hidden';
  }
  
  
  //###############################################################   DELETE DATA ##################################################################################
    render() {
  const { results } = this.state;   
	//const res1=this.state.results2;
    return (
	<div id = "namer" className = "namer-input">
      <center>
	  <form>
	    <input
		  id = "INPUT"
          placeholder="Пошук:190.Фіо.тощо"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />&nbsp;
				<input
          placeholder="Кількість результатів"
          ref={input => this.resnum = input}
		            //onChange={this.handleInputChange}
  /><select ref = {input => this.invtype = input} >
		<option value = '0' selected>Оберіть тип обладнання</option>
		<option value = '01' >01 - Комп'ютери, ноутбуки, сервер</option>
		<option value = '02' >02 - Монітори</option>
		<option value = '03' >03 - Принтери</option>
		<option value = '04' >04 - Сканери</option>
		<option value = '05' >05 - ДБЖ</option>
		<option value = '06' >06 - Устаткування комп мережі</option>
		<option value = '010' >010 - Телефони</option>
		<option value = '031' >031 - МФУ</option>
		<option value = '011' >011 - Комп'ютер</option>
		<option value = '012' >012 - Ноутбук</option>
		<option value = '013' >013 - Сервер</option>
		<option value = '061' >061 - Свич</option>
		<option value = '062' >062 - Комутатор</option>
		<option value = '063' >063 - Рроутер</option>
		<option value = '064' >064 - Модем</option>
		
		</select>
		&nbsp;
		<text id = 'getInfo' className = 'getInfo' value = ''>{this.state.text}</text>
		<button className = "ButtonEDIT"
		    onClick={(e) =>this.EditValue(e)}
			onDoubleClick={(e=>this.EditDoubleValue(e))}
			onMouseOver = {this.Event}
			onMouseOut = {this.EventOut}
		> Редагувати</button>
				<button className = "ButtonINSERT"
            onClick={(e) =>this.InsertData(e)}
			onDoubleClick={(e=>this.InsertDoubleData(e))}
			onMouseOver = {this.Event}
			onMouseOut = {this.EventOut}
		> Додати записи</button>
		{/*################################################# ADD insert fields ######################################################*/}
		<form className  = "Insertform" id  = "Insert" style={{ padding: "10px", visibility:"hidden" }}>
          <input
		    id = "Insert1"
            type="text"
            ref = "myText"
            onChange={e => this.setState({ InsertID: e.target.value})}
            placeholder="МНМА-190..."
			/>
			<input
			id = "Insert2"
            type="text"
            onChange={e => this.setState({ InsertCategory: e.target.value })}
            placeholder='ПОСАДА'
          />
		  <input
		  id = "Insert3"
            type="text"
            onChange={e => this.setState({ InsertName: e.target.value })}
            placeholder='ФІО'
          />
		  <input
		  id = "Insert4"
            type="text"
            onChange={e => this.setState({ InsertNameMatherial: e.target.value })}
            placeholder='Назва матцінності'
          /><p>
          <button id = "InsertButton"
            onClick={(e) =>this.InsertDB(this.state.InsertID,this.state.InsertCategory,this.state.InsertName,this.state.InsertNameMatherial,e)}
			
          >
            ДОДАТИ ЗАПИС
          </button>
		  </p>
        </form>
		
		{/*################################################# ADD insert fields ######################################################*/}
		
		
		
		
				
        <ul style = {{width:"60em"}}>
          {results.length <= 0
            ? <div className = "ask" id = 'ask'>"Введіть будь-ласка вірне значення : '190...', Фамілію"</div> :
		                     results.map((dat, i) => (
			    <fieldset className = "Fieldset"><li  style = {{textAlign:"justify"}} key = {dat._id} > &nbsp;
                  <span key ={i} style={{ color: "gray" }}> Інвентарний №: </span><b>{dat.p01}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> назва : </span><b>{dat.p02}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> Код : </span><b>{dat.p02a}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> дата введення в експл  : </span><b>{dat.p03}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> ціна  : </span><b>{dat.p04}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> серійний №  : </span><b>{dat.p05}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> розташування  : </span><b>{dat.p06}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> ФІО : </span><b>{dat.p07}</b> <br />
				  <span key ={i} style={{ color: "gray" }}> посада : </span><b>{dat.p08}</b> <br /> 
				  <div id  = "Edit" style={{ padding: "10px", visibility:"hidden" }}>
		   <label for="ID">ID</label>
          <input
		    id = "ID"
            type="text"
            style={{ width: "250px" }}
			value = {dat._id}
			ref = "myText"
            //onChange={e => this.setState({ idToUpdate: document.getElementById('Text').Value})}
            placeholder="id of item to update here"
			/>&nbsp;
	      <label for="Text1">ІНВ</label>    
		  
          <input
		    id = "Text"
            type="text"
            style={{ width: "250px" }}
			//value = {dat.p01}
			ref = "myText"
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder= {dat.p01}
			/>&nbsp;
			<label for="Text2">ТИП</label>
			<input
			id = "Text2"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updateMatherial: e.target.value })}
            placeholder={dat.p02}
          />&nbsp;
		  <label for="Text3">Код</label>
			<input
			id = "Text3"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updateCode: e.target.value })}
            placeholder={dat.p02a}
          />&nbsp;
		    <label for="Text4">ДАТА</label>
			<input
			id = "Text4"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updateDate: e.target.value })}
            placeholder={dat.p03}
          />&nbsp;
		  <label for="Text5">ЦІНА</label>
			<input
			id = "Text5"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updatePrice: e.target.value })}
            placeholder={dat.p04}
          />&nbsp;
		  <label for="Text6">SER№</label>
			<input
			id = "Text6"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updateSerial: e.target.value })}
            placeholder={dat.p05}
          />&nbsp;
		  <label for="Text7">PLACE</label>
			<input
			id = "Text7"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updatePlace: e.target.value })}
            placeholder={dat.p06}
          />&nbsp;
		   <label for="Text8">ПОСАДА</label>
            <input
		    id = "Text8"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder={dat.p08}
          />
		  &nbsp;
		  <label for="Text">FIO</label>
          <input
		    id = "Text9"
            type="text"
            style={{ width: "180px" }}
            onChange={e => this.setState({ updateNameToApply: e.target.value })}
            placeholder={dat.p07}
			ref= "sdsdsd"
          />
		  
		  <p>
          <button id = "EditButton"
            onClick={(e) =>this.updateDB(this.state.idToUpdate,this.state.updateNameToApply,this.state.updateToApply,this.state.updateMatherial,this.state.updateCode,this.state.updateDate,this.state.updatePrice,this.state.updateSerial,this.state.updatePlace,e)}>
            РЕДАГУВАТИ ЗАПИС
          </button>
		  <button id = "DeleteButton"
            onClick={(e) =>this.DeleteDB(this.state.updateMatherial,e)}>
            ВИДАЛИТИ ЗАПИС
          </button>
		  </p>
        </div>
				  				  		
				                </li></fieldset>
              ))
			  }
					
        </ul>
		
	   </form>
	   
	   
	   
	    		</center>
	</div>

	
    )
  }
  
}


export default Search
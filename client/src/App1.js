import React, {Component} from 'react'
import { Search } from './App'




export default class Greeting extends React.Component{
	      constructor(props) {
	      super(props);	
          this.state = {
	        query : this.props.query,
		        }
				this.handleNameChange = this.handleNameChange.bind(this);
	     	}
	handleNameChange(event){
		this.setState({
			name:event.target.value
			
		});
		
		
	}
	
	render(){
		return(
		<center>
		<section>
             
               <input 
			   value  = {this.state.query} 
               onChange = {this.handleNameChange}   
               />
			 
        </section>
		</center>
		)
				
	}
	
	
	
	
}
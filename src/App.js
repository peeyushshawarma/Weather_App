import React from 'react';
import ReactDOM from 'react-dom';
import Titles from './component/Titles';
import Form from './component/Form';
import Weather from './component/Weather';

//http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=fe15a9905cd921086c990cffd362ea84&units=metric
const API_key='10eb113ef476e122e3039874b6682e00';

class App extends React.Component{
	state={
		temperature: undefined,
		city: undefined,
		country:undefined,
		humidity:undefined,
		desciption:undefined,
		error:undefined
	}
	getWeather = async (e)=> {
		e.preventDefault();
		const city =e.target.elements.city.value;
		const country= e.target.elements.country.value;
		const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}&units=metric`);		
		const data=await api_call.json();
		if(city && country){
		console.log(data);
		this.setState({
			temperature: data.main.temp,
			city: data.name,
			country:data.sys.country,
			humidity: data.main.humidity,
			description: data.weather[0].description,
			error:""

		});
	} else {
		this.setState({
			temperature: undefined,
			city: undefined,
			country:undefined,
			humidity: undefined,
			description: undefined,
			error:"Please Enter the value"

		});

	}
	}

	render(){
		return(
			<div>

				<div className='wrapper'>
					<div className='main'>
						<div className='container'>
							<div className='row'>
							  <div className='col-xs-5 title-container'>
							   <Titles/>
							  </div>
							  <div className='col-xs-7 form-container'>
							   	  <Form getWeather={this.getWeather}/>
								  <Weather temperature ={this.state.temperature}
								  city ={this.state.city}
								  country ={this.state.country}
								  humidity={this.state.humidity}
								  description={this.state.description}
								  error={this.state.error}
						  />
							  </div>
							</div>
						</div>
					</div>
				</div>								
				
			</div>

			);

	}

};
export default App;


				
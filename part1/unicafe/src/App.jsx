import { useState } from 'react'

const Header = ({title}) =>{
	console.log({title})
	return <h2> {title} </h2>
}

const Button = ({handler, title}) => {
	console.log({handler, title})
	return (
		<>
		<button onClick = {handler}> {title} </button>
		</>)
}

const StatLine = ({value, title}) => {
	if (title == "percent"){
		return <tr><td> {title} {value}% </td></tr>
	}
	return <tr><td> {title} {value} </td></tr>
}

const Statistics = (props) => {
	if (props.all === 0){
		return (
			<div>
			<Header title = "Statistic Data" />
			<p> Buttons must be pressed to show statistics </p>
			</div>
		)
	}
	return (
		<div>
		<table>
		<tbody>
		<StatLine value ={props.good} title = "good" />
		<StatLine value ={props.bad} title = "bad" />
		<StatLine value ={props.neutral} title = "neutral" />
		<StatLine value ={props.percent} title = "percent" />
		<StatLine value ={props.average} title = "average" />
		</tbody>
		</table>
		</div>
	)

}
const App = () => {
  // save clicks of each button to its own state
  	const [good, setGood] = useState(0)
  	const [neutral, setNeutral] = useState(0)
  	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)
	const [average, setAv] = useState(0)
	const [percent, setPer] = useState(0)

	const goodAdd = () => {
		console.log([good, setGood])
		console.log([all, setAll])
		const newGood = good + 1
		const nA = newGood + neutral + bad
		setAll(nA)
		console.log(nA)
		console.log(newGood)
		setGood(newGood)
		setPer(newGood/nA * 100)
		const av = (newGood - bad)/nA
		setAv(av)
	}

	const neutralAdd = () => {
		console.log([neutral, setNeutral])
		console.log([all, setAll])
		const newNuetral = neutral + 1
		setAll(good + newNuetral + bad)
		console.log(newNuetral)
		setNeutral(newNuetral)
		setPer(good/(good+bad+newNuetral) * 100)
	}

	const badAdd = () => {
		console.log([bad, setBad])
		console.log([all, setAll])
		const newBad = bad + 1
		setAll(newBad + good + neutral)
		console.log(newBad)
		setBad(newBad)
		const av = (good - newBad)/(all-bad+newBad)
		setAv(av)
		setPer(good/(all-bad+newBad) * 100)
	}



	return(
		<div>
		<Header title = "give feedback" />
		<Button handler = {goodAdd} title = "good" />
		<Button handler = {badAdd} title = "bad" />
		<Button handler = {neutralAdd} title = "neutral" />
		<Statistics all = {all} bad = {bad} good = {good} neutral = {neutral} average = {average} percent={percent} /> 
		</div>

	)
  
}

export default App

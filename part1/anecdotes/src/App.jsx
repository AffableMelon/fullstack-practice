import { useState } from 'react'

const Button = ({handler, title}) => {
        console.log({handler, title})
        return (
                <>
                <button onClick = {handler} > {title} </button>
                </>)
}

const ShowVotes = ({index, points}) => {
  if (points[index] === 0){
    return <p>Be the first to vote! </p>
  }
  return  <p>this anecdot has {points[index]} points</p>
}

const ShowTop = ({points, anecdotes}) => {
  console.log({points, anecdotes})
  if(Math.max(... points) === 0){
    return<p>No current max</p>
  }
  return <p>{anecdotes[points.indexOf(Math.max(... points))]}</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  	const [selected, setSelected] = useState(0)
    const [points, setPoint] = useState(new Array(anecdotes.length).fill(0))
    console.log(points)

{}

	const randomizer = () =>{
    const num = Math.floor(Math.random() * 7)
		setSelected(num)
    console.log(num)
	}
  const voteFor = () => {
    console.log(points)
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
    console.log(points)
  }
  return (
    <div>
	  <p>{anecdotes[selected]} </p>
	  <Button title="next" handler = {randomizer} />
    <Button title="Vote" handler = {voteFor} />
    <ShowVotes index = {selected} points= {points} />
    <ShowTop points = {points} anecdotes={anecdotes} />
    </div>
  )
}

export default App

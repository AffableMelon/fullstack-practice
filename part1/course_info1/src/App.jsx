


// const Content = (props) => {
// 	console.log(props) 
// 	return(
// 		<>
// 		<Part part = {props.detail[0].part} ex={props.detail[0].ex} />
// 		<Part part = {props.detail[1].part} ex={props.detail[1].ex} />
// 		<Part part = {props.detail[2].part} ex={props.detail[2].ex} />
// 		</>
// 	)
// }
// const Part = (props) => {
// 	console.log(props) 
// 	return <p> {props.part} {props.ex} </p>

// }

// const Header = (props) => 
// 	{
// 		// console.log(props) 
// 		return <h1> {props.course} </h1>
// }

// const Total = (props) => {
// 	return <p> number of exercises {props.ex1} </p>
// } 

// const App = () => {
// 	const course = 'half stack application development'
// 	const detail = [ 
// 		{part: 'Fundementals of React', ex: 10}, 
// 		{part: 'Using props to pass data', ex: 7},
// 		{part: 'State of a component', ex: 14},
// 	]
// 	// console.log(course, detail)

// 	return(
// 		<>
// 		<Header course = {course} />		
// 		<Content detail = {detail} />
// 		<Total ex1 = {detail[0].ex + detail[1].ex + detail[2].ex} />
// 		</>
// 	)
// }



// const Header = (props) => 
// 	{
// 		// console.log(props) 
// 		return <h1> {props.course} </h1>
// }
// const Content = p => {
// 	console.log(p)
// 	return <p>{p.name} {p.ex}</p>

// }
// const Total = p => {
// 	const tot = p.ex1 + p.ex2 + p.ex3
// 	return <p>number of exerciess {tot}</p>
// }
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

// 	return(
// 		<>
// 		<Header course = {course} />	
// 		<Content name = {part1.name} ex = {part1.exercises} />			
// 		<Content name = {part2.name} ex = {part2.exercises} />
// 		<Content name = {part3.name} ex = {part3.exercises} />	
// 		<Total ex2 = {part2.exercises} ex3= {part3.exercises} ex1 = {part1.exercises}  /> 
// 		</>
// 	)
// }

// const Header = (props) => 
// 	{
// 		// console.log(props) 
// 		return <h1> {props.course} </h1>
// }
// const Content = (props) => {
// 	console.log(props) 
// 	return(
// 		<>
// 		<Part part = {props.parts[0].name} ex={props.parts[0].exercises} />
// 		<Part part = {props.parts[1].name} ex={props.parts[1].exercises} />
// 		<Part part = {props.parts[2].name} ex={props.parts[2].exercises} />
// 		</>
// 	)
// }
// const Part = (props) => {
// 	console.log(props) 
// 	return <p> {props.part} {props.ex} </p>

// }

// const Total = p => {
// 	const tot = p.parts[0].exercises + p.parts[1].exercises +p.parts[2].exercises
// 	return <p>number of exercises {tot} </p>
// }

// const App = () => {
//   const course = 'Half Stack application development'
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]

//   return (
//     <>
// 	<Header course = {course} />
// 	<Content parts = {parts} />
// 	<Total parts = {parts} />
// 	</>
//   )
// }

const Header = (props) => 
	{
		// console.log(props) 
		return <h1> {props.course.name} </h1>
}
const Content = (props) => {
	console.log(props) 
	return(
		<>
		<Part part = {props.course.parts[0].name} ex={props.course.parts[0].exercises} />
		<Part part = {props.course.parts[1].name} ex={props.course.parts[1].exercises} />
		<Part part = {props.course.parts[2].name} ex={props.course.parts[2].exercises} />
		</>
	)
}
const Part = (props) => {
	console.log(props) 
	return <p> {props.part} {props.ex} </p>

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
		<Header course = {course} />
      <Content course = {course} />
    </div>
  )
}

export default App


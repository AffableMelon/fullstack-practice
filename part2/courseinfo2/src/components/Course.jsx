import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
    console.log(course)
return(
    <>
    {course.map((p, i) => {
        return(
        <>
        <Header key = {i} title = {p.name} />  
        <Content key = {i + 1} parts = {p.parts} /> 
        </>
        )        
    })}
    </>   
)
}

export default Course
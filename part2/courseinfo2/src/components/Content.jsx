import Part from './Part'
import Total from './Total'
const Content = ({parts}) => {
    console.log(parts)

    return(
        <>
        {parts
        .map(p => {
            console.log(p);
            return(
            <Part key ={p.id} part = {p} />)
        })}
        
        <Total total = {parts.reduce((sum,p) => {
                console.log(p.exercises, sum)
                return sum += p.exercises
            }, 0)
        } />
        </>
    )

}

export default Content
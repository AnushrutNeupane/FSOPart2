const Header = ({ name }) => { return <h1> {name} </h1>
}


const Part = ({ part }) =>{
    return (
    <p>
        {part.name} {part.exercises}
    </p>
    )   
}

const Content = ({ parts }) => {
    return (
    <>
    {parts.map (part => 
        <Part key={part.id} part={part} />
    )}
    </>
    )
}




const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

    return (
    <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <b>Total number of exercises: {total}</b>
    </>
    )
}



export default Course
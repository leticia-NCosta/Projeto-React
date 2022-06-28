import ProjectsForm from '../projects/ProjectsForm'
import './css/NewProject.css'
import {useNavigate} from 'react-router-dom'

function NewProject(){

  const navegue = useNavigate();

  function createPost(projects){

    projects.cost=0;
    projects.services = [];

    fetch('http://localhost:5000/projects',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projects),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      navegue('/projects', {message: "Projeto criado com sucesso!"})
    })
    .catch((err) => console.log(err))
  }
  

  return (
    <div className='newproject_container'>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os seviços</p>
      <ProjectsForm handleSubmit={createPost} btnText="Criar Projeto"/>
    </div>
  )
}

export default NewProject
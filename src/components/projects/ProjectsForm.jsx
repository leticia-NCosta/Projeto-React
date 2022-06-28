import {useState, useEffect} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import './css/ProjectsForm.css'

function ProjectsForm({btnText, handleSubmit, projectData}){
  const[categories, setCategories]= useState([]);
  const[project, setProject]= useState(projectData || {});


  useEffect(() => {
    fetch('http://localhost:5000/categories',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      },  
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setCategories(data)
    })
    .catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault(); 
    handleSubmit(project)
  } 

  const handleChange = (e) =>{
    setProject({...project, [e.target.name]: e.target.value})
  }
  const handleCategory = (e) =>{
    setProject({...project, category:{
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    }})
  }
 
  return (
    <form onSubmit={submit} className='form'>
      <Input 
      type="text" 
      name="name" 
      placeholder="Insira o nome do projeto" 
      text="Nome do projeto:"
      handleOnChange={handleChange}
      value={project.name ? project.name : ''}
      />
      <Input 
      type="number" 
      name="budget" 
      placeholder="Insira o orçamento total" 
      text="Orçamento do projeto:"
      handleOnChange={handleChange}
      value={project.budget ? project.budget : ''}
      />

      <Select
      name="category_id"
      text="Selecione a categoria"
      options={categories}
      handleOnChange={handleCategory}
      value={project.category ? project.category.id:'' }
      />
     <SubmitButton text = {btnText}/>
    </form>
  )
}

export default ProjectsForm
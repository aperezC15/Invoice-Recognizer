import React from 'react'
import Pasos from '../componentes/stepper'
import axios from 'axios'

class stepper extends React.Component {
    constructor(props) {
      super(props)
      
    }
   
    //metodo para enviar las facturas
    subirFacturas() {
      const me = this
      axios.get('http://localhost:8082/api/alumnos', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(respuesta => {
        if(respuesta.status === 200) {
          me.setState({
            data: respuesta.data
          })
        }
      })
    }
  
    
  
  componentDidMount() {
    this.subirFacturas()
  } 
  
  render() {
    return (
      <Pasos 
      />
    )
  }
  }
  
  export default stepper;
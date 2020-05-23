import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearNuevoProductoAction } from '../actions/productoActions'

 const NuevoProducto = ({history}) => {

    //state del componente
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    //utilizar useDispatch
    const dispatch = useDispatch()

    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)


    //manda a llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )

    //cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault()

        //validar form
        if(nombre.trim() === '' || precio <= 0){
            return;
        }

        //si no hay errores

        //crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar a home
        history.push('/')
    }

     return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Agregar nuevo producto</h2>
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placehoder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e=>setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placehoder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e=>setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                            {cargando ? <p>Cargando...</p> : null}
                            {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error...</p> : null}
                        </form>
                    </div>
                </div>
            </div>
        </div>
     )
 }
 export default NuevoProducto
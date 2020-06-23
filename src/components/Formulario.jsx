import React, { useState } from 'react'

const Formulario = ({setBusquedaLetra}) => {
	const [busqueda, setBusqueda] = useState({
		artista: '',
		cancion: '',
	})
	const [error, setError] = useState(false)

	const { artista, cancion } = busqueda

	const actualizarState = (e) => {
		setBusqueda({
			...busqueda,
			[e.target.name]: e.target.value,
		})
	}

	const buscar = (e) => {
		e.preventDefault()
		if (artista.trim() === '' || cancion.trim() === '') {
			setError(true)
			return
		}
		// Todo bien
    setError(false)
    setBusquedaLetra(busqueda)
	}

	return (
		<div className='bg-info'>
			<div className='container'>
				<div className='row'>
					<form
						onSubmit={buscar}
						className='col card text-white bg-transparent mb-5 pt-5 pb-2'
					>
						<fieldset>
							<legend className='text-center'>
								Buscador en letras de canciones
							</legend>
              <div className='row'>
                {error ? (
                  <div className='col-md-12'>
                    <div className='alert alert-danger p-2 text-center'>
                      <strong>Todos los campos son obligatorios!!</strong>
                    </div>
                  </div>
                ) : null}
								<div className='col-md-6'>
									<div className='form-group'>
										<label>Artista</label>
										<input
											type='text'
											className='form-control'
											name='artista'
											placeholder='Nombre Artista'
											value={artista}
											onChange={actualizarState}
										/>
									</div>
								</div>
								<div className='col-md-6'>
									<div className='form-group'>
										<label>Canción</label>
										<input
											type='text'
											className='form-control'
											name='cancion'
											placeholder='Nombre Canción'
											value={cancion}
											onChange={actualizarState}
										/>
									</div>
								</div>
							</div>
							<button type='submit' className='btn btn-primary float-right'>
								Buscar
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Formulario

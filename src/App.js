import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import Formulario from './components/Formulario'
import LetraCancion from './components/LetraCancion'
import InfoArtista from './components/InfoArtista'

function App() {
	const [busquedaLetra, setBusquedaLetra] = useState({})
	const [letra, setLetra] = useState('')
  const [bioArtista, setBioArtista] = useState('')
  const [cargando, setCargando] = useState(false)

	const { artista, cancion } = busquedaLetra

	useEffect(() => {
		if (Object.keys(busquedaLetra).length === 0) return

    const consultarApis = async () => {
      setCargando(true);
			const keyNapster = '*****'
			const urlArtista = `http://api.napster.com/v2.2/search?apikey=${keyNapster}&query=${artista}&type=artist`
			const urlCancion = `https://api.lyrics.ovh/v1/${artista}/${cancion}`

			const [resArtista, resCancion] = await Promise.all([
				axios
					.get(urlArtista)
					.then((res) => res)
          .catch((error) => {
						if (error.response) {
							// Request made and server responded
							console.log(error.response.data)
							console.log(error.response.status)
              console.log(error.response.headers)
              return error.response;
						} else if (error.request) {
							// The request was made but no response was received
							console.log(error.request)
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log('Error', error.message)
						}
					}),
				axios
					.get(urlCancion)
					.then((res) => res)
          .catch((error) => {
						if (error.response) {
              return error.response;
						}
					}),
			])
			console.log('Artista', resArtista)
			console.log('Cancion', resCancion)
			if (
				resArtista.status !== 404 &&
				resCancion.status !== 404
			) {
				setBioArtista(resArtista.data.search.data.artists[0].bios[0].bio)
				setLetra(resCancion.data.lyrics)
			} else {
				setBioArtista('No encontrado')
				setLetra('No encontrado')
      }
      setCargando(false);
		}
		consultarApis()
	}, [busquedaLetra])

	return (
		<div className='App'>
			<Formulario setBusquedaLetra={setBusquedaLetra} />
			<div className='container mt-4'>
        <div className='row'>
          {cargando ? (
            <div className="col-md-6 offset-md-3 text-center">Cargando...</div>
          ) : (
            <Fragment>
              <div className='col-md-6 my-3'>
                {bioArtista ? <InfoArtista bioArtista={bioArtista} /> : null}
              </div>
              <div className='col-md-6 my-3'>
                <LetraCancion letra={letra} />
              </div>
            </Fragment>
          )}
				</div>
			</div>
		</div>
	)
}

export default App

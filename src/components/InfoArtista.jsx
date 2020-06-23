import React, { Fragment, useEffect } from 'react'

const InfoArtista = ({ bioArtista }) => {
  useEffect(() => {
    document.getElementById('bio').innerHTML = bioArtista;
  }, [bioArtista]);
  
	return (
		<Fragment>
			<h3>Biografía del artista.</h3>
			<hr />
			<p id='bio' className='letra'>
			</p>
		</Fragment>
	)
}

export default InfoArtista

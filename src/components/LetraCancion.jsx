import React, {Fragment} from 'react';

const LetraCancion = ({letra}) => {
  if(letra.length === 0) return null;
  return (
    <Fragment>
      <h3>Letra de canción</h3>
      <hr />
      <p className="letra">{letra}</p>
    </Fragment>
  );
};

export default LetraCancion;
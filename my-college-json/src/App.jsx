import React, { useState } from 'react'
import CollegeForm from './CollegeForm'
import ShowCollege from './ShowCollege'

const App = () => {

  const [reff, setReff] = useState(0);
  const [edit, setEdit] = useState(null);

  return (
    <div>
      <h2>WELCOME TO MY COLLEGE</h2>

      <CollegeForm
        added={() => {
          setReff(reff + 1);
          setEdit(null);
        }}
        acceptEdit={edit}
      />

      <ShowCollege
        refresh={reff}
        updateCollege={(c) => setEdit(c)}
      />
    </div>
  );
}

export default App;
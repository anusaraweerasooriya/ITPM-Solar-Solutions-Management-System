import React from 'react'
import { useParams } from "react-router-dom";

const AddToRecentForm = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Form : {id} </h1>
    </div>
  )
}

export default AddToRecentForm

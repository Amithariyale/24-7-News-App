import React from 'react'
import loading from './loading.gif.gif'

const spinner=()=>{
    return (
      <div className='text-center '>
        <img className='bg-light my-3' src={loading} alt="loading" />
      </div>
    )
  
}
export default spinner;
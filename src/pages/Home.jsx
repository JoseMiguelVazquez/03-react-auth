import React, { useState, useEffect } from 'react'
import { getAllItems } from '@/services/itemServices'

const Home = () => {
  const [itemsData, setItemsData] = useState([])
  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await getAllItems()
        if (response.status === 200) {
          setItemsData(response.data)
        }
      } catch (error) {
        console.log('Ocurrió un error: ' + error.message)
      }
    }
    fetchItemsData()
  }, [])
  return (
    <>
      <h1>
        Home
      </h1>
      <div className='d-flex flex-row flex-wrap'>
        {
          itemsData?.map(product => (
            <div key={product.id} className='card' style={{ width: '18rem' }}>
              <img
                src={product.image}
                className='card-img-top'
                style={{ maxHeight: '300px' }}
                alt={product.product_name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.product_name}</h5>
                <p className='card-text'>{product.description}</p>
                <a href='#' className='btn btn-primary'>Comprar</a>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Home

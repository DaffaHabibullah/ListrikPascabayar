import React from 'react'
import Navbar from '../../../layout/Navbar/Navbar'
import CardBox from '../../../components/Card/CardBox'
import CardList from '../../../components/Card/CardList'

function User() {

  const LISTDATA = [
    {
      type: '10KWh',
      label: 'Rp. 100.000'
    },
    {
      type: '10KWh',
      label: 'Rp. 100.000'
    },
    {
      type: '10KWh',
      label: 'Rp. 100.000'
    },
  ]
  return (
    <Navbar>
        <div className='flex flex-wrap'>
          <CardBox title="Listrik yang tersisa" value="10KWh" color="#3232"/>
          <CardBox title="Listrik yang tersisa" value="10KWh" color="#3232"/>
          <CardBox title="Listrik yang tersisa" value="10KWh" color="#3232"/>
          <CardBox title="Listrik yang tersisa" value="10KWh" color="#3232"/>
        </div>
        <div className='w-64'>
          <CardList list={LISTDATA} title="Tarif Listrik" />
        </div>
    </Navbar>
  )
}

export default User
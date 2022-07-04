import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../store/GlobalState'
import { getData } from '../utils/fetchData'
import CompaingItem from '../components/compaing/CompaingItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'

const Home = (props) => {
  const [compaings, setCompaings] = useState(props.compaings)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const {state, dispatch} = useContext(DataContext)

  useEffect(() => {
    setCompaings(props.compaings)
  },[props.compaings])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }

  return(
    <div className="home_page">
      <Head>
        <title>Home Page</title>
      </Head>
      <Filter  />
      <div className="compaings">
        {
          compaings.length === 0 
          ? <h2>No Compaing</h2>

          : compaings.map(compaing => (
            <CompaingItem key={compaing._id} compaing={compaing}  />
          ))
        }
      </div>
      
      {
        props.result < page * 1 ? ""
        : <button className="btn btn-outline-info d-block mx-auto mb-4"
        onClick={handleLoadmore}>
          Load more
        </button>
      }
    
    </div>
  )
}


export async function getServerSideProps({query}) {
  const page = query.page || 1
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `compaing?limit=${page * 3}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      compaings: res.compaings,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home
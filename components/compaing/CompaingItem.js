import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

const CompaingItem = ({compaing}) => {
    const { state, dispatch } = useContext(DataContext)
 

    return(
        <div className="card" style={{ width: '18rem' }}>
         
            <img className="card-img-top" src={compaing.images[0].url} alt={compaing.images[0].url} />
            <div className="card-body">
                <Link href={`compaing/${compaing._id}`}>
                <h5 className="card-title text-capitalize" title={compaing.title}>
                    {compaing.title}
                </h5>
                  </Link>
                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">{compaing.amount} SGB</h6>
                 
                </div>

                <p className="card-text" title={compaing.long_description}>
                    {compaing.long_description}
                </p>
                
            </div>
        </div>
    )
}


export default CompaingItem
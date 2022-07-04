import Head from 'next/head'
import { useState } from 'react'
import { getData } from '../../utils/fetchData'

const DetailCompaing = (props) => {
    const [compaing] = useState(props.compaing)
    const [tab, setTab] = useState(0)


    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    return(
        <div className="row detail_page">
            <Head>
                <title>Detail Compaing</title>
            </Head>

            <div className="col-md-6">
                <img src={ compaing.images[tab].url } alt={ compaing.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '350px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {compaing.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{compaing.title}</h2>
                <h5 className="text-danger">${compaing.amount}</h5>

            

                <div className="my-2">{compaing.short_description}</div>
                <div className="my-2">
                    {compaing.long_description}
                </div>

                <button type="button" className="btn btn-dark d-block my-3 px-5">
                                        Delegate
                </button>

            </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`compaing/${id}`)
    // server side rendering
    return {
      props: { compaing: res.compaing }, // will be passed to the page component as props
    }
}


export default DetailCompaing
import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'

const Filter = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')


    const router = useRouter()


 

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (
        <div className="input-group">
       

            <form autoComplete="off" className="mt-2 col-md-8 px-0">
                <input type="text" className="form-control" list="title_product"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            </form>

            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="custom-select text-capitalize"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Newest</option>
                     <option value="-amount">Amount: Hight-Low</option>
                     <option value="amount">Amount: Low-Hight</option>

                </select>
            </div>


        </div>
    )
}

export default Filter
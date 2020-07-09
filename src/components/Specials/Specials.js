import React, { useState, useEffect, } from 'react';
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import SpecialCard from '../SpecialCard/SpecialCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Specials.css';
import {API_QUERY} from '../../constants/apiConstants';

function Specials() {
    const url = `${API_QUERY}bar_specials/`
    const [barSpecials, setBarSpecials] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            setBarSpecials(data)
            setIsLoading(false)
        }
        fetchData()
    }, [url])
    
  

    return( 
        <MDBContainer>
            <h2 className="special-header">Best Happy Hour Deals</h2>
            {isLoading ? (<LoadingSpinner color="text-white" />): 
                (<MDBRow >
                    <MDBCol size="md">
                        <SpecialCard deal={barSpecials[0]} />
                    </MDBCol>

                    <MDBCol size="md">
                        <SpecialCard deal={barSpecials[1]} />
                    </MDBCol>

                    <MDBCol size="md">
                        <SpecialCard deal={barSpecials[2]} />
                    </MDBCol>

                </MDBRow>)
            }
        </MDBContainer>
    )
}

export default Specials;
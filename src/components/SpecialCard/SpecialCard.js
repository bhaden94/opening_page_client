import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody } from "mdbreact";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {SPECIALS_HAPPYHOURS_API, BAR_API} from '../../constants/apiConstants';

function SpecialCard(props) {
    const urlRestaurant = `${BAR_API}` // change to chrisurl/businesses/
    const urlHappyHours = `${SPECIALS_HAPPYHOURS_API}restaurants/happy_hours/`
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState()
    const [deal, setDeal] = useState()
    const [restaurant, setRestaurant] = useState()
    const [hasHappyHours, setHasHappyHours] = useState(false)
    const [happyHourBegin, setHappyHourBegin] = useState()
    const [happyHourEnd, setHappyHourEnd] = useState()

    const getRestaurantData = async (id) => {
        setIsLoading(true)
        const res = await fetch(urlRestaurant + id)
        const data = await res.json()
        setRestaurant(data[0].name)
        setIsLoading(false)
    }

    const getHappyHourData = async (id) => {
        const res = await fetch(urlHappyHours + id)
        const data = await res.json()
        if (data.happy_hour_begin && data.happy_hour_end) {
           setHappyHourBegin(formatTime(data.happy_hour_begin))
           setHappyHourEnd(formatTime(data.happy_hour_end))
           setHasHappyHours(true)
        }
    }

    // format from DB -> HH:MM:SS
    // given output from function -> H:MM AM/PM
    const formatTime = (time) => {
        const [sHours, minutes] = time.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'AM' : 'PM';
        const hours = +sHours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }

    useEffect(() => {
        setTitle(props.deal.special_name)
        setDeal(props.deal.special_pricing)
        // getHappyHourData needs to come before getRestaurantData so that the loading icon 
        // will be properly displayed while waiting for backend
        getHappyHourData(props.deal.restaurant_id)
        getRestaurantData(props.deal.restaurant_id)
    }, [props.deal.special_name, props.deal.special_pricing, props.deal.restaurant_id])


    return(
        <MDBCard>
        {isLoading ? (<div><LoadingSpinner color="text-primary" /></div>) : 
            <MDBCardBody>
                <MDBCardTitle tag="h5">
                    <a href={`https://beercrawlfrontapp.herokuapp.com/businesses/${props.deal.restaurant_id}`} target="_blank">{restaurant}</a>
                    <p id="bigger" className="card-text">
                        Happy Hours:
                        {hasHappyHours ? 
                        (` ${happyHourBegin} - ${happyHourEnd}`): 
                        " No Happy Hours"}
                    </p>
                </MDBCardTitle>
                    <hr />
                    <p className="special-title">{title}</p>
                <MDBCardText>{deal}</MDBCardText>
            </MDBCardBody>
        }
        </MDBCard>
    )
}

export default SpecialCard;
import React from 'react';
import { MDBBtn, MDBAnimation, MDBContainer, MDBInput } from "mdbreact";
import './DrinkNow.css'

function DrinkNow(props) {
    // make options the cities that we have loaded
    const options = [
        { value: 'NewYork', label: 'New York' },
        { value: 'LosAngeles', label: 'Los Angeles' },
        { value: 'Austin', label: 'Austin' }
      ]

    return(
        <MDBContainer>
            <MDBAnimation type="flipInX">
                <MDBInput label="City" valueDefault={options[0].label} background />
                <MDBBtn href="https://routefront.herokuapp.com/" className="form-item" size="lg" gradient="blue">Drink Now!</MDBBtn>
            </MDBAnimation>
        </MDBContainer>
    )
}

export default DrinkNow;
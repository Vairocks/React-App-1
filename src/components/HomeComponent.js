import React from 'react';
import {Card} from 'react-bootstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from "../shared/baseUrl";

function RenderCard({item, isLoading, errMess}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else
    return(
        <Card>
            <Card.Img class="col-12" src={baseUrl + item.image} alt={item.name}/>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                {item.designation ? <Card.Subtitle>{item.designation}</Card.Subtitle> : null}
                <Card.Text>{item.description}</Card.Text>
            </Card.Body>
        </Card>

    );
}


function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div   className="col-12 col-md m-1">   
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading} 
                    errMess={props.dishesErrMess}/>
                </div>
                <div   className="col-12 col-md m-1">
                    <RenderCard item={props.promo} isLoading={props.promosLoading} errMess={props.promosErrMess}/>
                </div>
                <div   className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.promosLoading} errMess={props.promosErrMess}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
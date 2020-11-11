import React from 'react'

const HomeComponent = (props:any) =>{
//    console.log(props.location.state?props.location.state.message:"");
//    console.log(props);

    const showAlert = () => {
        if(props.location && props.location.state){
            if(props.location.state.type && props.location.state.message){
                let type = props.location.state.type;
                let message = props.location.state.message;
                return <div className={"alert " + type}>{message}</div>
            }
        }
        return null;
    }
    return (<div data-test="HomePage">
        {showAlert()}
        <h2>home</h2>
        {props.loggedUser?JSON.stringify(props.loggedUser):"User is logout"}
    </div>);
}

export default HomeComponent;
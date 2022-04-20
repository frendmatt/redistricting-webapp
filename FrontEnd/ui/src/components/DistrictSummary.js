import { Typography } from "@material-ui/core";
import { Minority } from "../enums";

function DistrictSummary(props) {
    if (!props.data){
        return (<div></div>);
    }
    var ret = []
    var types = [
        "populationType"
        ,"minorities"
        ,"parties"
    ];
    var typeNames = {
        "populationType": "Population"
        ,"minorities": "Minority"
        ,"parties": "Party"
    }
    types.forEach(type => {
        var listVal = 
            Object.keys(props.data.populations[type]).map((key) => {
                return props.data.populations[type][key] !== 0 ? (
                    <div style = {{ marginTop: "-10%" }}>
                        <h5 class = "districtInfoText" >
                            <Typography gutterBottom>
                                { capitalize(key) + ": " }
                                { props.data.populations[type][key].toLocaleString() } 
                            </Typography>
                            
                        </h5>
                    </div> 
                ) : <div/>
            });
        ret.push(
            <div>
                <h4 class = "districtInfoText" style = {{ textAlign: "center" }}>
                    <strong> 
                        { typeNames[type] }
                    </strong>
                </h4>
                {listVal}
            </div>
        )
    });
    if (props.data.incumbents.length>0){
        var incumbents = Object.values(props.data.incumbents).map((value) => {
            return (
                <div style = {{ marginTop: "-10%" }}> 
                    <h5 class = "districtInfoText" >
                        <Typography gutterBottom>
                            {value}
                        </Typography>
                    </h5>
                </div>
            )
        });
        ret.push(
            <div >
                <h4 class = "districtInfoText" style = {{ textAlign: "center" }}>
                    <strong> 
                        Incumbents:
                    </strong>
                </h4>
                {incumbents}
            </div>
        )
    }
    //#region Manual
    // var min_list = 
    //         Object.keys(props.data.minorities).map((key)=>{
    //             return <h3> <strong>{key}</strong> {props.data.minorities[key].toLocaleString()} </h3>
    //         });
    // ret.push(
    //     <div>
    //         <h2 class><strong>Minorities:</strong></h2>
    //         {min_list}
    //     </div>
    // )
    // var pop_list = 
    //     Object.keys(props.data.populations).map((key)=>{
    //         return <h3> <strong>{key}</strong> {props.data.populations[key].toLocaleString()} </h3>
    //     });
    // ret.push(
    //     <div>
    //         <h2><strong>Population Types:</strong></h2>
    //         {pop_list}
    //     </div>
    // )
    // var party_list = 
    //     Object.keys(props.data.parties).map((key)=>{
    //         return <h3> <strong>{key}</strong> {props.data.parties[key].toLocaleString()} </h3>
    //     });
    // ret.push(
    //     <div>
    //         <h2><strong>Parties:</strong></h2>
    //         {party_list}
    //     </div>
    // )
    //#endregion manual
    return (
        ret
    );
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default DistrictSummary
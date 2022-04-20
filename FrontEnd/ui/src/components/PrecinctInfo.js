import { Typography } from "@material-ui/core";
import { Minority } from "../enums";

function PrecinctInfo(props) {
    if (!props.data){
        return (<div></div>);
    }
    var ret = []
    ret.push(
        <h3 style = {{ marginLeft: "10%", marginRight: "10%" }}>
            { props.data.name.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); 
                })
            }   
        </h3>
    )
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
    console.log(props.data);
    types.forEach(type => {
        if (type === "id") return
        var listVal = 
            Object.keys(props.data[type]).map((key) => {
                return props.data[type][key] !== 0 ? (
                    <div style = {{ marginTop: "-10%" }}>
                        <h5 class = "precinctPopulationValue" >
                            <Typography gutterBottom>
                                { capitalize(key) + ": " }
                                { props.data[type][key].toLocaleString() } 
                            </Typography>
                            
                        </h5>
                    </div> 
                ) : <div/>
            });
        ret.push(
            <div>
                <h4 class = "precinctPopulationGroup" style = {{ textAlign: "center" }}>
                    <strong> 
                        { typeNames[type] }
                    </strong>
                </h4>
                {listVal}
            </div>
        )
    });
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

export default PrecinctInfo
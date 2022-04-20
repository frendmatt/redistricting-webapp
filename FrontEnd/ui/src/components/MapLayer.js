import {Source, Layer} from "react-map-gl";

function MapLayer(props) {
        var ret = [];
        Object.values(props.layers).forEach(layer => {
            var id = `${layer.type}_${layer.id}`;
            if (layer.type === "State") id = layer.id;
            else if (layer.type === "County" || layer.type === "Precinct") id = layer.type;
            var layerStyle = { ...layer.layerStyle, id:id, layout: {'visibility': layer.enabled ? 'visible' : 'none'} };
            if (layer.type === "County") {
                ret.splice(0, 0, 
                    <Source id = { id } type = "geojson" data = { layer.data }>
                        <Layer 
                            { ...layerStyle }
                        />
                    </Source>)
            } else if (layer.type === "Precinct") {
                ret.splice(1, 0, 
                    <Source id = { id } type = "geojson" data = { layer.data }>
                        <Layer 
                            { ...layerStyle }
                        />
                    </Source>)
            } else {
                ret.push(
                    <Source id = { id } type = "geojson" data = { layer.data }>
                            <Layer 
                                { ...layerStyle }
                            />
                    </Source>
                )
            }
        });
        return ret
}

export default MapLayer
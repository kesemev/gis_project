import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, source, destination } = this.props;

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(source.latitude, source.longitude),
        L.latLng(destination.latitude, destination.longitude),
      ],
    }).addTo(map.leafletElement);

    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);

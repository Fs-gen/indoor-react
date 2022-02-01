import "./App.css";
import trilat from "trilat";
import * as mqtt from "mqtt/dist/mqtt";
import { useEffect, useState } from "react";

import maps from "./img/map.jpg";
import dot from "./img/dot1.gif";
import StationDot from "./Station-dot";
import { stationx, stationy } from "./Position";
function App() {
  const [data, setData] = useState("");
  const [output, setOutput] = useState([0, 0]);
  // mqtt client/
  const client = mqtt.connect("wss://test.mosquitto.org:8081");

  client.on("connect", function () {
    client.subscribe("indoor-daus");
  });

  useEffect(() => {
    client.on("message", function (topic, message) {
      // message is Buffer
      try {
        setData(message.toString());
        let mydata = JSON.parse(message.toString());
        console.log(mydata.e[0].m);

        var posx, posy;
        // x y station
        function stationx(mac) {
          if (mac === "0d:70:7c:b7:c5:dd") {
            posx = 0.0;
          } else if (mac === "a4:c1:24:f3:01:3a") {
            posx = 5;
          } else if (mac === "51:0b:54:9f:95:31") {
            posx = 2.5;
          } else {
            posx = 0.0;
          }

          return posx;
        }

        function stationy(mac) {
          if (mac === "0d:70:7c:b7:c5:dd") {
            posy = 0.0;
          } else if (mac === "a4:c1:24:f3:01:3a") {
            posy = 0.0;
          } else if (mac === "51:0b:54:9f:95:31") {
            posy = 3.6;
          } else {
            posy = 0.0;
          }
          return posy;
        }

        //rssi to meter
        function calculateDistance(rssi) {
          let P = -69; // tx power at 1 meter
          let n = 3;
          let d = Math.pow(10, (P - rssi) / (10 * n)); //(n ranges from 2 to 4)
          return d;
        }

        var input = [
          //      X     Y     R= rssi
          [
            stationx(mydata.e[0].m),
            stationy(mydata.e[0].m),
            calculateDistance(mydata.e[0].r),
          ], //station 1
          [
            stationx(mydata.e[1].m),
            stationy(mydata.e[1].m),
            calculateDistance(mydata.e[1].r),
          ], //station 2
          [
            stationx(mydata.e[2].m),
            stationy(mydata.e[2].m),
            calculateDistance(mydata.e[2].r),
          ], //station 3
        ];

        setOutput(trilat(input));
        console.log(output);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  // console.log(output);

  return (
    <div>
      <div className="App">
        {/* station 1 */}
        <StationDot x={0} y={0} />
        {/* station 2 */}
        <StationDot x={5} y={0} />
        {/* station 3 */}
        <StationDot x={2.5} y={3.6} />

        <div className="maps">
          {/* dot position */}

          {!!data && (
            <img
              className="position-absolute"
              src={dot}
              alt="dot"
              width={12}
              height={12}
              style={{
                top: output[1] * 20,
                left: output[0] * 20,
              }}
            />
          )}

          {/* maps */}
          <img className="img-fluid" src={maps} alt="map" />
        </div>
        <div>{data}</div>
      </div>
    </div>
  );
}

export default App;

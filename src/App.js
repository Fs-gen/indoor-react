import "./App.css";
import trilat from "trilat";
import * as mqtt from "mqtt/dist/mqtt";
import { useEffect, useState } from "react";

import maps from "./img/map.jpg";
import dot from "./img/dot1.gif";

function App() {
  const [data, setData] = useState([]);
  // mqtt client/
  const client = mqtt.connect("wss://test.mosquitto.org:8081");

  client.on("connect", function () {
    client.subscribe("indoor-daus");
  });

  useEffect(() => {
    client.on("message", function (topic, message) {
      // message is Buffer
      setData(message.toString());
      console.log(message.toString());
    });
  }, []);

  navigator.getBattery().then(function (battery) {
    console.log(battery.level);
  });

  // var mydata = JSON.parse(data);
  // console.log(mydata);

  //rssi to meter
  function calculateDistance(rssi) {
    let P = -69; // tx power at 1 meter
    let n = 3;
    let d = Math.pow(10, (P - rssi) / (10 * n)); //(n ranges from 2 to 4)
    return d;
  }

  var input = [
    //      X     Y     R= rssi
    [0.0, 0.0, calculateDistance(-69)], //station 1
    [5, 0.0, calculateDistance(-69)], //station 2
    [2.5, 3.6, calculateDistance(-55)], //station 3
  ];

  var output = trilat(input);

  // console.log(output);

  return (
    <div>
      <div className="App">
        {/* station 1 */}
        <div
          style={{
            padding: 5,
            backgroundColor: "#FA58B6",
            position: "absolute",
            left: input[0][0] * 20,
            top: input[0][1] * 20,
          }}
        ></div>

        {/* station 2 */}
        <div
          style={{
            padding: 5,
            backgroundColor: "#FA58B6",
            position: "absolute",
            left: input[1][0] * 20,
            top: input[1][1] * 20,
          }}
        ></div>

        {/* station 3 */}
        <div
          style={{
            padding: 5,
            backgroundColor: "#FA58B6",
            position: "absolute",
            left: input[2][0] * 20,
            top: input[2][1] * 20,
          }}
        ></div>

        <div className="maps">
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
          <img className="img-fluid" src={maps} alt="map" />
        </div>
        <div>{data}</div>
      </div>
    </div>
  );
}

export default App;

var posx, posy;
// x y station
export function stationx(mac) {
  if (mac === "0d:70:7c:b7:c5:dd") {
    posx = 0.0;
  } else if (mac === "a4:c1:24:f3:01:3a") {
    posx = 5;
  } else if (mac === "51:0b:54:9f:95:31") {
    posx = 2.5;
  } else {
    posy = 0.0;
  }

  return posx;
}

export function stationy(mac) {
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

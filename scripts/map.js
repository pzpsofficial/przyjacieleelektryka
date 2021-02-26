let mymap = L.map('mapid', { scrollWheelZoom: false }).setView(
  [49.60979, 20.70382],
  18
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

let marker = L.marker([49.60979, 20.70382]).addTo(mymap);
marker
  .bindPopup('<b>Sądecki Elektryk</b><br>Ul. Limanowskiego 4 Nowy Sącz')
  .openPopup();

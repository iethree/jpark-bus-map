# Jefferson Park Transit Center Bus Display
I've been a rider of the CTA buses in Jefferson Park for a few years now, and I've always wanted a digital display in the terminal of the arrival times for each bus that is easy to read and also shows where each bus is located.
![Jefferson Park Transit Center Bus Map](https://github.com/iethree/jpark-bus-map/blob/master/map-display.png)
After wishing for years, I built it myself, in hopes that it could be useful to the CTA or other riders.

## Features

- up-to-date map of upcoming bus departures
- updates every minute, indicated by progress bar in the upper-right hand corner
- animations to indicate bus updates to users
- buses about to depart are highlighted in red

## Limitations

- doesn't include PACE bus times (PACE doesn't expose a public bus tracker API)
- doesn't indicate whether buses are delayed
- only displays properly at 1920x1080

## Installation

Nodejs > 8.0 is required, though the backend is just one very simple API call.
The only required configuration is to put a valid CTA API key in the key variable in `get-times.js`

```javascript
npm install
npm start
```

The webserver will launch at `http://localhost:3000`

## Possible Further Development

- add metra and blue line times
- better background texture

## License

MIT. Anyone is free to use this code for anything they like. It's my hope that the CTA will take it an use it for themselves.
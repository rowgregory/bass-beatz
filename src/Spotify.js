const clientId = '4aa3173d45cf486f8db613ee7099ee22';
const uriRedirect = 'http://localhost:3000/callback/';
let accessToken;

// Module that provides authorization to use the Spotify API
const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const tokenFound = window.location.href.match(/access_token=([^&]*)/);
    const expireTime = window.location.href.match(/expires_in=([^&]*)/);

    if(tokenFound && expireTime) {
      accessToken = tokenFound[1];

      const tokenExpires = Number(expireTime[1]);

      window.setTimeout(() => accessToken = '', tokenExpires * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;

    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${uriRedirect}`;
    
      window.location = accessUrl;

    }
  }, // end of getAccessToken method
} //end of Spotify module

export default Spotify;
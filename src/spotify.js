const clientId = "46abc3c43de74b3faa94d2a7228cca5a";
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played%20user-top-read&response_type=token&show_dialog=true`;

export const getTokenFromResponse = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  const ab = paramsSplitUp.access_token;
  return ab;
};

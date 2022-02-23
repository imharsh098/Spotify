import React, { useEffect } from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { async } from "q";

function Body({ spotify }) {
  const [{ discover_weekly }, { device }, dispatch] = useStateValue();
  const playPlaylist = async () => {
    await spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcOtzyy23ZRoL`,
        offset: {
          position: 5,
        },
        position_ms: 0,
      })
      .then((res) => {
        console.log(res, 855);
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        context_uri: `spotify:track:${id}`,
        offset: {
          position: 5,
        },
        position_ms: 0,
      })
      .then((res) => {
        spotify
          .getMyCurrentPlayingTrack()
          .then((r) => {
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            });
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item, index) => (
          <div key={index}>
            <SongRow playSong={playSong} track={item.track} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;

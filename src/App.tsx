import React, { useState, useEffect, useRef} from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { getThumbnail, queueAudioDownload } from "./services/api";
import { ThumbnailProps, Thumbnail } from "./components/Thumnail";
import { io } from "socket.io-client";


function App() {
  const [search, setSearch] = useState(
    "https://www.instagram.com/p/CMPs_E7A7-I/"
  );
  const [thumbnail, setThumbnail] = useState<ThumbnailProps>({});
  

 const socketRef: any = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:7777');
    socketRef.current.onAny((teste: any) => console.log({teste}));
  }, []);

  const handleDownload = async () => {
    const data = await getThumbnail(search);
    console.log({ data });
    //@ts-ignore
    setThumbnail({ data });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  /* const handleAudioDownload = async () => {
    donwloadAudio(search).then(res => {
      window.open(res.Location)
    })
  } */

  const handleAudioRequest = async () => {
    const {redis_id} = await queueAudioDownload(search);
  };
  return (
    <div className="main-container">
      <div className="download-container">
        <h1>Download instagram audio</h1>
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          handleClick={handleDownload}
        />
      </div>
      <div>
        {thumbnail.data && (
          <>
            <Thumbnail data={thumbnail.data} />
            <button onClick={handleAudioRequest}>download</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

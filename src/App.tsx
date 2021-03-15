import React, { useState, useEffect, useRef} from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { getThumbnail, queueAudioDownload } from "./services/api";
import { ThumbnailProps, Thumbnail } from "./components/Thumnail";
import { io } from "socket.io-client";
/* const socket = io('http://localhost:7777'); */

/* socket.onAny((event, ...args) => {
  console.log(event, args);
}); */
function App() {
  const [search, setSearch] = useState(
    "https://www.instagram.com/p/CMPs_E7A7-I/"
  );
  const [thumbnail, setThumbnail] = useState<ThumbnailProps>({});
  const [redisId, setRedisId] = useState(null);
  const [s3Link, setS3Link] = useState('');
  

 const socketRef: any = useRef();

  useEffect(() => {
    if(Boolean(redisId)){
      socketRef.current = io('http://localhost:7777');
      socketRef.current.on(redisId, (teste: any) => {console.log({teste});if(Boolean(teste.s3Link)){setS3Link(teste.s3Link)}});
    }
  }, [redisId]);

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
    setRedisId(redis_id);
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
      <div>
        {Boolean(s3Link) && (
          <a href={s3Link}>baixar a paradinha</a>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { getThumbnail, donwloadAudio } from './services/api';
import { ThumbnailProps, Thumbnail } from './components/Thumnail';

function App() {
  const [search, setSearch] = useState('https://www.instagram.com/p/CGbEiVjDwCh/');
  const [thumbnail, setThumbnail] = useState<ThumbnailProps>({})

  const handleDownload = async () => {
    const data = await getThumbnail(search);
    console.log({data})
    //@ts-ignore
    setThumbnail({data})
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const handleAudioDownload = async () => {
    donwloadAudio(search).then(res => {
      window.open(res.Location)
    })
  }
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
          <Thumbnail data={thumbnail.data}/>
          <button onClick={handleAudioDownload}>download</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

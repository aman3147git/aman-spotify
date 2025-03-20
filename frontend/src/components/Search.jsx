import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axiosInstance from '../axios';

const Search=()=>{
    const { query, id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query) {
            navigate("/");
            return;
          }
        if (query) {
            const fetchSearchResults = async () => {
                try {
                    const response = await axiosInstance.get('/api/stat/search', { params: { query } });
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchSearchResults();
        } else if (id) {
            const fetchItemDetails = async () => {
                try {
                    const response = await axiosInstance.get(`/api/stat/search/${id}`);
                    setData(response.data);
                } catch (error) {
                    console.error('Error fetching item details:', error);
                }
            };
            fetchItemDetails();
        }
    }, [query, id]);

    const handleResultClick = (item, type) => {
        navigate(`/${type}/${item._id}`);
        
    };

    if (data) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>{data.title}</h2>
                <p>{data.artist}</p>
                {data.imageUrl && <img src={data.imageUrl} alt={data.title} style={{ maxWidth: '100%' }} />}
                {data.audioUrl && (
                    <audio controls>
                        <source src={data.audioUrl} type="audio/mpeg" />
                    </audio>
                )}
                {data.releaseYear && <p>Released: {data.releaseYear}</p>}
            </div>
        );
    }

    return (
        <div className='flex  p-8 gap-[160px]'>
          <div className="flex flex-col gap-2">
            {results.albums && (
                <>
                    <h3 className='text-white font-bold text-3xl'>Albums</h3>
                    {results.albums.map((album) => (
                        <div
                            key={album._id}
                            onClick={() => handleResultClick(album, 'album')}
                            className='text-white hover:bg-gray-800  p-2 flex items-center gap-1'
                        >
                          <img className='h-16 w-16' src={album.imageUrl} alt="" />
                          <div className="flex flex-col">

                            <h2 className='hover:underline'>{album.title}</h2>
                            <p>{album.artist}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
            </div>
            <div className="flex flex-col gap-2">
            {results.songs && (
                <>
                    <h3 className='text-white font-bold text-3xl'>Songs</h3>
                    {results.songs.map((song) => (
                        <div
                            key={song._id}
                            onClick={() => handleResultClick(song, 'song')}
                            className='text-white hover:bg-gray-800  p-2 flex items-center gap-1'
                        >
                        <img className='h-16 w-16' src={song.imageUrl} alt="" />
                          <div className="flex flex-col">

                            <h2 className='hover:underline'>{song.title}</h2>
                            <p>{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
            </div>
        </div>
    );
}

export default Search;

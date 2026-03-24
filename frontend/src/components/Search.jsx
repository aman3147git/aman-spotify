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
            <div className="p-4 sm:p-6 text-white">
                <h2 className="text-2xl font-bold sm:text-3xl">{data.title}</h2>
                <p className="mt-2 text-gray-300">{data.artist}</p>
                {data.imageUrl && <img src={data.imageUrl} alt={data.title} className="mt-4 w-full max-w-md rounded-lg object-cover" />}
                {data.audioUrl && (
                    <audio controls className="mt-4 w-full max-w-full">
                        <source src={data.audioUrl} type="audio/mpeg" />
                    </audio>
                )}
                {data.releaseYear && <p className="mt-2 text-gray-400">Released: {data.releaseYear}</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-4 sm:flex-row sm:gap-12 sm:p-6 lg:p-8">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {results.albums && (
                <>
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">Albums</h3>
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
            <div className="flex min-w-0 flex-1 flex-col gap-2">
            {results.songs && (
                <>
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">Songs</h3>
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

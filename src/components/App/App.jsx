import { useState, useEffect } from 'react';
import * as API from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalImgs, setTotalImgs] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
      setStatus('pending');

      try {
        const res = await API.searchImgs(searchValue, page);
        if (res.totalHits === 0) {
          setStatus('rejected');
          return;
        }
        setGallery(s => [...s, ...res.hits]);
        setTotalImgs(res.total);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    };

    fetch();
  }, [searchValue, page]);

  const handleSubmit = value => {
    if (value === '') {
      toast.error('Please enter your request!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    if (value === searchValue) {
      toast.warning(`You already search: "${searchValue}".`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    setTotalImgs(0);
    setGallery([]);
    setSearchValue(value);
    setPage(1);
  };

  const onLoadMore = () => {
    setStatus('pending');
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar
        onSubmit={handleSubmit}
        totalImgs={totalImgs}
        status={status}
      />
      {status === 'idle' && (
        <p className="start-text">Please enter your request</p>
      )}
      {status === 'rejected' && (
        <p className="start-text">
          Sorry, no result at your request "{searchValue}" :(
        </p>
      )}
      <ImageGallery items={gallery} status={status} searchValue={searchValue} />
      {gallery.length !== 0 && totalImgs > 12 && gallery.length < totalImgs && (
        <Button onClick={onLoadMore} classname={'Button'}>
          Load More
        </Button>
      )}
      <div className="loading">
        <Loader />
      </div>
      <ToastContainer />
    </div>
  );
}

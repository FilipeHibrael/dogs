import React from 'react';
import FeedPhotosItem from './FeedPhotositem';
import styles from './FeedPhotos.module.css';
import { useSelector } from 'react-redux';

function FeedPhotos({ setModalPhoto }) {
  const { list } = useSelector((state) => state.feed);

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {list.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
}

export default FeedPhotos;

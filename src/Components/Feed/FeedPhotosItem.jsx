import React from 'react';
import Image from '../Helper/Image';
import styles from './FeedPhotosItem.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/ui';
import { fetchPhoto } from '../../store/photo';

function FeedPhotosItem({ photo }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(openModal());
    dispatch(fetchPhoto(photo.id));
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
}

export default FeedPhotosItem;

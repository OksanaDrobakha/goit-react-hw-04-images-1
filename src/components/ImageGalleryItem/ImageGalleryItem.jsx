import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';

export default function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { webformatURL, largeImageURL, tags } = item;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleOpenModal}
      />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <img src={largeImageURL} alt={tags} loading="lazy" />;
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

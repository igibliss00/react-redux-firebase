import React from 'react';
import styles from '../componentStyles.module.css'

const PreviewPicture = props => {
  const {  image_url } = props;
    return (
      <div  className={styles.preivew} >
      <img 
        src={image_url}
        alt=''
      />
      </div>
    );
  
};

export default PreviewPicture;
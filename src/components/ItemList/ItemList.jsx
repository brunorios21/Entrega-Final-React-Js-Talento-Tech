import React from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

export const ItemList = ({ productos }) => {
  return (
    <div className={styles.grid}>
      {productos.map((producto) => (
        <Item key={producto.id} {...producto} />
      ))}
    </div>
  );
};
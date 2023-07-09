import React from 'react';
import styles from './ContentBox.module.css';

type ContentBoxStyle = {
  backgroundColor: string;
};

type ContentBoxProps = {
  title: string;
  children: React.ReactNode;
  style: ContentBoxStyle;
};

const ContentBox = ({ title, children, style }: ContentBoxProps) => (
  <div className={styles.container} style={style}>
    <div className={styles.header}>
      <span>{title}</span>
    </div>
    <div>{children}</div>
  </div>
);

export default ContentBox;

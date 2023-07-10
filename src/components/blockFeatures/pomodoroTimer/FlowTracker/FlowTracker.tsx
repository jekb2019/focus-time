import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FlowTracker.module.css';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FlowTracker = () => (
  <div className={styles.container}>
    <div className={styles.selectors}>
      <button className={`${styles.active} ${styles.selector}`}>Focus</button>
      <button className={styles.selector}>Short Break</button>
      <button className={styles.selector}>Long Break</button>
    </div>
    <div className={styles.tracker}>
      <button className={styles.traversor}>
        <FontAwesomeIcon className={styles.arrow} icon={faArrowLeft} />
      </button>
      <span className={styles.state}>F</span>
      <span className={styles.state}>S</span>
      <span className={styles.state}>F</span>
      <span className={styles.state}>S</span>
      <span className={styles.state}>F</span>
      <span className={styles.state}>S</span>
      <span className={styles.state}>F</span>
      <span className={styles.state}>L</span>
      <button className={styles.traversor}>
        <FontAwesomeIcon className={styles.arrow} icon={faArrowRight} />
      </button>
    </div>
  </div>
);

export default FlowTracker;

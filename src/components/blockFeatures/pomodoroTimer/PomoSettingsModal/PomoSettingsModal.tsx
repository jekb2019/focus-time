import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SettingField } from '../../../../service/timer/types';
import Modal from '../../../Modal/Modal';
import styles from './PomoSettingsModal.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type PomoSettingsModalProps = {
  isSettingsOpen: boolean;
  closeSettings: () => void;
  defaultSettingFocus: SettingField | null;
};

const PomoSettingsModal = ({
  isSettingsOpen,
  closeSettings,
  defaultSettingFocus,
}: PomoSettingsModalProps) => (
  <Modal open={isSettingsOpen} onClose={closeSettings}>
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={closeSettings}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2 className={styles.title}>Settings</h2>
      <div className={styles.settings}>
        <div className={styles.field}>
          <label htmlFor="pomodoro">Focus (minutes)</label>
          <input className={styles.inputField} id="pomodoro" type="number" />
        </div>
        <div className={styles.field}>
          <label htmlFor="short-break">Short break (minutes)</label>
          <input className={styles.inputField} id="short-break" type="number" />
        </div>
        <div className={styles.field}>
          <label htmlFor="long-break">Long break (minutes)</label>
          <input className={styles.inputField} id="long-break" type="number" />
        </div>
        <div className={styles.field}>
          <label htmlFor="auto-start">Auto Start</label>
          <input className={styles.checkbox} id="auto-start" type="checkbox" />
        </div>
      </div>
      <div className={styles.buttons}>
        <button>Apply</button>
      </div>
    </div>
  </Modal>
);

export default PomoSettingsModal;

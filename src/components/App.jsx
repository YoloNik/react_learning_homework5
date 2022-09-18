import style from './App.module.scss';
import Phonebook from './Phonebook/Phonebook';

export const App = () => {
  return (
    <div className={style.app}>
      <Phonebook />
    </div>
  );
};

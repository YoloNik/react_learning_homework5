import Navigation from './Navigation/Navigation';
import Main from './Main/Main';

import style from './App.module.scss';

export const App = () => {
  return (
    <div className={style.app}>
      <Navigation />
      <Main />
    </div>
  );
};

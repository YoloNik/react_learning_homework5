import React from 'react';

import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <li className={styles.navigationList__item}>
          <NavLink
            activeClassName={styles.active}
            className={styles.link}
            to="/homePage"
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navigationList__item}>
          <NavLink
            activeClassName={styles.active}
            className={styles.link}
            to={{
              pathname: '/moviesPage',
              search: ``,
              state: { from: '/homePage' },
            }}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

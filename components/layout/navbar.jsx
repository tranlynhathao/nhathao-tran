import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ThemeMode from '../utils/theme.util';
import settings from '../../content/_settings.json';
import content from '../../content/navbar.json';
import css from '../../styles/structure/navbar.module.scss';
import Logo from '../Logo';

export default function Navbar() {
  const router = useRouter();
  const [menuState, menuToggle] = useState(false);
  const currentPath = router.pathname;

  useEffect(() => {
    menuToggle(false);
  }, []);

  useEffect(() => {
    class RouteEvents {
      constructor() {
        console.log(
          '%c☰  Navigation Router Events Loaded',
          'background: #060708; color: #fff; padding: .125rem .75rem; border-radius: 5px; font-weight: 900; '
        );
        this.addEventListeners();
      }

      closeMenu() {
        menuToggle(false);
      }

      addEventListeners() {
        router.events.on('routeChangeComplete', this.closeMenu);
      }

      removeEventListeners() {
        router.events.off('routeChangeComplete', this.closeMenu);
      }
    }

    const routeEvents = new RouteEvents();

    return () => {
      routeEvents.removeEventListeners();
    };
  }, [router.events]);

  useEffect(() => {
    class ScrollEvents {
      constructor() {
        console.log(
          '%c▼  Navigation Scroll Events Loaded',
          'background: #060708; color: #fff; padding: .125rem .75rem; border-radius: 5px; font-weight: 900; '
        );

        window.sticky = {};
        window.sticky.nav = document.querySelector(`nav`);

        this.addEventListeners();
      }

      addEventListeners() {
        if (window.sticky.nav) {
          window.addEventListener('DOMContentLoaded', this.maybeHideNav, false);
          document.addEventListener('scroll', this.maybeHideNav, false);
        }
      }

      removeEventListeners() {
        if (window.sticky.nav) {
          window.removeEventListener(
            'DOMContentLoaded',
            this.maybeHideNav,
            false
          );
          document.removeEventListener('scroll', this.maybeHideNav, false);
        }
      }

      maybeHideNav() {
        const nC = window.sticky.nav.classList;
        const hiddenAt = window.innerHeight / 2;

        if (
          window.scrollY > this.lastY &&
          window.scrollY > hiddenAt &&
          !nC.contains(css.hidden)
        ) {
          nC.add(css.hidden);
        } else if (window.scrollY < this.lastY && nC.contains(css.hidden)) {
          nC.remove(css.hidden);
        }

        this.lastY = window.scrollY;
      }
    }

    const scrollEvents = new ScrollEvents();

    return () => {
      scrollEvents.removeEventListeners();
    };
  }, []);

  const toggleMenu = () => {
    menuToggle(!menuState);
  };

  return (
    <nav id="Navbar" className={css.container}>
      <ul className={css.menu}>
        <li className={css.menuHeader}>
          <Logo />
          <button
            onClick={toggleMenu}
            className={css.mobileToggle}
            data-open={menuState}
          >
            <div>
              <span></span>
              <span></span>
            </div>
          </button>
        </li>
        <li data-open={menuState} className={css.menuContent}>
          <ul>
            {content.map(({ url, title }, index) => {
              if (url === '#about-me') {
                return (
                  <li key={index}>
                    <a
                      href="about-me"
                      className={`p-2 ${currentPath === url ? 'text-white' : ''} hover:underline underline-offset-4`}
                    >
                      {title}
                    </a>
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className={currentPath === url ? 'bg-pink-600' : ''}
                >
                  <Link href={url}>
                    <a
                      className={`p-2 ${currentPath === url ? 'text-white' : ''} hover:underline underline-offset-4`}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeMode />
            </li>
          </ul>
        </li>
      </ul>
      <span
        onClick={toggleMenu}
        className={css.menuBlackout}
        data-open={menuState}
      ></span>
    </nav>
  );
}

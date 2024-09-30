import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ThemeMode from '../utils/theme.util';
import settings from '../../content/_settings.json';
import content from '../../content/navbar.json';
import css from '../../styles/structure/navbar.module.scss';
import Logo from '../Logo';
import classNames from 'classnames';

export default function Navbar() {
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const [lastY, setLastY] = useState(0);
  const currentPath = router.pathname;

  // Reset menu when route changes
  useEffect(() => {
    setMenuState(false);
  }, [router.pathname]);

  // Handle route change events
  useEffect(() => {
    const handleRouteChange = () => setMenuState(false);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Handle scroll events
  useEffect(() => {
    const nav = document.querySelector('nav');

    const handleScroll = () => {
      const hiddenAt = window.innerHeight / 2;

      if (window.scrollY > lastY && window.scrollY > hiddenAt && !nav.classList.contains(css.hidden)) {
        nav.classList.add(css.hidden);
      } else if (window.scrollY < lastY && nav.classList.contains(css.hidden)) {
        nav.classList.remove(css.hidden);
      }

      setLastY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastY]);

  const toggleMenu = () => {
    setMenuState((prev) => !prev);
  };

  return (
    <nav id="Navbar" className={css.container}>
      <ul className={css.menu}>
        <li className={css.menuHeader}>
          <Logo />
          <button onClick={toggleMenu} className={css.mobileToggle} data-open={menuState}>
            <div>
              <span></span>
              <span></span>
            </div>
          </button>
        </li>
        <li className={classNames(css.menuContent, { [css.menuOpen]: menuState })}>
          <ul>
            {content.map(({ url, title }, index) => (
              <li
                key={index}
                className={classNames({
                  [css.activeLink]: currentPath === url && url !== "/", // Tô màu nếu là mục hiện tại và không phải trang chủ
                })}
              >
                <Link href={url}>
                  <a className={`p-2 ${currentPath === url && url !== "/" ? 'text-white' : ''} hover:underline underline-offset-4`}>
                    {title}
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <ThemeMode />
            </li>
          </ul>
        </li>
      </ul>
      <span onClick={toggleMenu} className={css.menuBlackout} data-open={menuState}></span>
    </nav>
  );
}

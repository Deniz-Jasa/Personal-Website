import * as React from 'react'
import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import MenuIcon from '@mui/icons-material/Menu';
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'
import cs from 'classnames'
import { Breadcrumbs, Header, useNotionContext } from 'react-notion-x'

import { navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

const resumeViewUrl = 'https://drive.google.com/file/d/1Up8Y15SmF0uR-OhmqDtJesIwdO58kk07/view?usp=sharing';

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', styles.themeToggle, !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoSunnyOutline /> : <IoMoonSharp />}
    </div>
  )
}

const ResumeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const viewResume = () => {
    window.open(resumeViewUrl, '_blank');
  };

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={viewResume}
      role="button"
      tabIndex={0}
      onKeyPress={viewResume}
    >
      {hasMounted ? 'resume' : 'Loading...'}
    </div>
  );
};

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'
  }

  return (
    <>
      <header className='notion-header'>
        <div className='notion-nav-header'>
          <div className='nav-logo'>
            <Breadcrumbs block={block} rootOnly={true} />
          </div>

          <div className={styles.navLinks}>
            {navigationLinks
              ?.map((link, index) => {
                if (!link.pageId && !link.url) {
                  return null
                }

                if (link.pageId) {
                  return (
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}

            <ResumeButton />
            <ToggleThemeButton />
          </div>

          <button onClick={toggleMenu} className={styles.menuToggle}>
            <MenuIcon style={{ fontSize: '26px' }} />
          </button>
        </div>
      </header>

      <div className={cs(styles.mobileMenuOverlay, isMenuOpen && styles.open)}>
        <div className={styles.mobileMenuHeader}>
          <ToggleThemeButton />
          <button onClick={toggleMenu} className={styles.closeButton}>
            <IoCloseOutline />
          </button>
        </div>
        <nav className={styles.mobileMenu}>
          <a
            href="/"
            className={cs(styles.mobileNavLink, 'breadcrumb', 'button')}
            onClick={toggleMenu}
            rel="noopener noreferrer"
          >
            home
          </a>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }
              const LinkComponent = link.pageId ? components.PageLink : components.Link
              const href = link.pageId ? mapPageUrl(link.pageId) : link.url
              return (
                <LinkComponent
                  href={href}
                  key={index}
                  className={cs(styles.mobileNavLink, 'breadcrumb', 'button')}
                  onClick={toggleMenu}
                >
                  {link.title}
                </LinkComponent>
              )
            })
            .filter(Boolean)}
          <a
            href={resumeViewUrl}
            className={cs(styles.mobileNavLink, 'breadcrumb', 'button')}
            onClick={toggleMenu}
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
        </nav>

      </div>

    </>
  )
}

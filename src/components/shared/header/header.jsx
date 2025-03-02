import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import Button from 'components/shared/button';
import Container from 'components/shared/container';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import MENUS from 'constants/menus.js';
import SearchIcon from 'icons/search.inline.svg';
import logoBlack from 'images/logo-black.svg';
import logoWhite from 'images/logo-white.svg';

import Burger from './burger';
// import DiscordIcon from './images/header-discord.inline.svg';
import DiscussionsIcon from './images/header-discussions.inline.svg';
import Github from './images/header-github.inline.svg';

const icons = {
  // discord: DiscordIcon,
  discussions: DiscussionsIcon,
};

const Header = forwardRef(
  (
    {
      theme,
      isMobileMenuOpen,
      onBurgerClick,
      isSignIn,
      isSticky,
      withBottomBorder,
      isDocPage,
      onSearchClick,
    },
    ref
  ) => {
    const isThemeBlack = theme === 'black';
    return (
      <header
        className={clsx(
          'safe-paddings absolute top-0 left-0 right-0 z-40 w-full lg:relative lg:h-14',
          isThemeBlack ? 'lg:bg-black' : 'bg-white',
          isSticky && 'sticky top-0 z-50 md:relative',
          withBottomBorder && 'border-b border-gray-7'
        )}
        ref={ref}
      >
        <Container className="flex items-center justify-between py-3.5" size="md">
          <Link className="hidden xl:block" to="/">
            <span className="sr-only">Neon</span>
            {isThemeBlack ? (
              <img
                className="h-9 2xl:h-8"
                src={logoWhite}
                width={114}
                height={32}
                alt=""
                aria-hidden
              />
            ) : (
              <img
                className="h-9 2xl:h-8"
                src={logoBlack}
                width={114}
                height={32}
                alt=""
                aria-hidden
              />
            )}
          </Link>
          <nav className="xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
            <ul className="flex space-x-12 2xl:space-x-10 lg:hidden">
              {MENUS.header.map(({ to, text, items }, index) => (
                <li className={clsx(items?.length > 0 && 'group relative')} key={index}>
                  <Link
                    className={clsx(
                      items?.length > 0 &&
                        'relative pr-3.5 before:absolute before:top-[7px] before:right-0 before:h-0 before:w-0 before:border-4 before:border-[transparent] before:transition-colors before:duration-200 group-hover:text-primary-2 group-hover:before:border-t-primary-2',

                      items?.length > 0 && isThemeBlack
                        ? 'before:border-t-white'
                        : 'before:border-t-black'
                    )}
                    to={to}
                    theme={isThemeBlack ? 'white' : 'black'}
                    size="sm"
                  >
                    {text}
                  </Link>
                  {items?.length > 0 && (
                    <div className="group-hover:opacity-1 invisible absolute bottom-0 translate-y-full pt-4 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
                      <ul
                        className=" rounded-2xl bg-white p-3.5"
                        style={{ boxShadow: '0px 4px 10px rgba(26, 26, 26, 0.2)' }}
                      >
                        {items.map(({ iconName, text, description, to }, index) => {
                          const Icon = icons[iconName];
                          return (
                            <li
                              className={clsx(
                                index !== 0 && 'mt-3.5 border-t border-t-gray-6 pt-3.5'
                              )}
                              key={index}
                            >
                              <Link
                                className="flex items-center whitespace-nowrap hover:text-primary-2"
                                to={to}
                              >
                                <Icon className="shrink-0" aria-hidden />
                                <span className="ml-3">
                                  <span className="t-xl block font-semibold !leading-none transition-colors duration-200">
                                    {text}
                                  </span>
                                  <span className="mt-1.5 block leading-none text-black">
                                    {description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Link
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 xl:hidden"
            to="/"
          >
            <span className="sr-only">Neon</span>

            {isThemeBlack ? (
              <img
                className="h-9 2xl:h-8"
                src={logoWhite}
                alt=""
                width={128}
                height={36}
                aria-hidden
              />
            ) : (
              <img
                className="h-9 2xl:h-8"
                src={logoBlack}
                alt=""
                width={128}
                height={36}
                aria-hidden
              />
            )}
          </Link>

          <div className="flex space-x-5 lg:hidden">
            <Button
              className="relative py-[11px] pl-11 xl:hidden"
              to={LINKS.github}
              size="xs"
              theme={isThemeBlack ? 'tertiary' : 'quaternary'}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github
                className={clsx(
                  'absolute top-1/2 left-1.5 -translate-y-1/2',
                  isThemeBlack ? 'text-white' : 'text-black'
                )}
              />
              <span>Star Us</span>
            </Button>
            {isSignIn && (
              <Button className="py-[11px]" to={LINKS.dashboard} size="xs" theme="primary">
                Sign In
              </Button>
            )}
            {!isSignIn && (
              <Button className="py-[11px]" to={LINKS.earlyAccess} size="xs" theme="primary">
                Get early access
              </Button>
            )}
          </div>
          <div className=" hidden items-center lg:flex">
            {isDocPage && (
              <button
                className="mr-5 flex h-5 w-5 items-center"
                type="button"
                onClick={onSearchClick}
              >
                <SearchIcon className="mb-[5px]" />
              </button>
            )}

            <Burger
              className={clsx(isThemeBlack ? 'text-white' : 'text-black')}
              isToggled={isMobileMenuOpen}
              onClick={onBurgerClick}
            />
          </div>
        </Container>
      </header>
    );
  }
);

Header.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']).isRequired,
  withBottomBorder: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  onBurgerClick: PropTypes.func.isRequired,
  isSignIn: PropTypes.bool,
  isSticky: PropTypes.bool,
  isDocPage: PropTypes.bool,
  onSearchClick: PropTypes.func,
};

Header.defaultProps = {
  isMobileMenuOpen: false,
  withBottomBorder: false,
  isSignIn: false,
  isSticky: false,
  isDocPage: false,
  onSearchClick: null,
};

export default Header;

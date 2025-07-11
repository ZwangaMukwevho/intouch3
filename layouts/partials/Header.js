import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAuthUserContext } from "../../logic/context/authUserContext";

const Header = () => {
  //router
  const router = useRouter();

  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // logo source
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;

  // Checks if user is logged in
  const id = Cookies.get("id");
  var isLoggedIn = false;
  if (typeof id !== "undefined") {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  // Logging out functionality
  const { logOut } = useAuthUserContext();

  const onSubmit = (event) => {
    router.push("/");
    Cookies.remove("id");
    logOut();
    event.preventDefault();
  };

  return (
    <header className="header">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo src={logo} />
        </div>

        {/* navbar toggler */}
        <button
          id="show-button"
          className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 md:order-1 ${
            navOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${
                        router.asPath === menu.url ? "nav-link-active" : ""
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {enable && isLoggedIn ? (
              <li className="md:hidden">
                <Link
                  className="btn btn-primary z-0 py-[14px]"
                  href={"/"}
                  onClick={onSubmit}
                  rel=""
                >
                  {"Log Out"}
                </Link>
              </li>
            ) : (
              <div class="flex flex-col">
                <li className="md:hidden">
                  <Link
                    className="btn btn-primary z-0 mb-2 py-[14px]"
                    href={link}
                    rel=""
                  >
                    {label}
                  </Link>
                </li>

                <li className="md:hidden">
                  <Link
                    className="btn btn-primary z-0 py-[14px]"
                    href={"signin"}
                    rel=""
                  >
                    {"Sign In"}
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:order-2 md:ml-0 md:flex">
            <Link
              onClick={onSubmit}
              className="btn btn-primary z-0 mr-4 py-[14px]"
              href={"/"}
              rel=""
            >
              {"Log Out"}
            </Link>
          </div>
        ) : (
          <div className="d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:order-2 md:ml-0 md:flex">
            <Link
              className="btn btn-primary z-0 mr-4 py-[14px]"
              href={link}
              rel=""
            >
              {label}
            </Link>
            <Link
              className="btn btn-primary z-0 py-[14px]"
              href={"/signin"}
              rel=""
            >
              {"Sign In"}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

import { useStaticQuery, graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { CTAButton } from "../CTAButton";

export const Menu = () => {
    const data = useStaticQuery(graphql
    `query MainMenuQuery {
        wp {
          acfOptionsMainMenu {
            mainMenu {
              menuItems {
                root {
                  destination {
                    ... on WpPage {
                      uri
                    }
                  }
                  label
                }
                subMenuItems {
                  destination {
                    ... on WpPage {
                      uri
                    }
                  }
                  label
                }
              }
              ctaButton {
                destination {
                  ... on WpPage {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }`
    )
    const {menuItems} = data.wp.acfOptionsMainMenu.mainMenu;
    return (
        <div className="bg-gradient-to-tr from-british-racing-green to-emerald-900 flex justify-between items-center text-white px-4 font-bold sticky top-0 z-20 h-16">
            <Link to="/">
                <StaticImage src="../../../static/icon.png" layout="fixed" height={30} alt="Logo" />
            </Link>
            <div className="flex h-full flex-1 justify-end">
                {(menuItems || []).map(menuItem => (
                    <div key={menuItem.root.label} className="group flex h-full cursor-pointer hover:bg-emerald-800 relative">
                        <Link to={menuItem.root.destination.uri} className="px-4 flex h-full items-center text-white no-underline">
                            {menuItem.root.label}
                        </Link>
                        {!!menuItem.subMenuItems?.length && 
                            <div className="bg-emerald-800 text-right absolute top-full right-0">
                                {menuItem.subMenuItems.map((subMenuItem, index) => (
                                    <Link to={subMenuItem.destination.uri} className="hidden group-hover:block whitespace-nowrap text-white p-4 no-underline hover:bg-emerald-700">
                                        {subMenuItem.label}
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className="pl-4">
                <CTAButton 
                    label={data.wp.acfOptionsMainMenu.mainMenu.ctaButton.label} destination={data.wp.acfOptionsMainMenu.mainMenu.ctaButton.destination.uri} 
                />
            </div>
        </div>
    );
}
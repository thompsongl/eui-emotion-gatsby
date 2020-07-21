/**
 * Chrome component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';

// @ts-ignore
import moon from './assets/moon.svg';
// @ts-ignore
import sun from './assets/sun.svg';

import {
  EuiButton,
  // @ts-ignore
  EuiHeader,
  // @ts-ignore
  EuiHeaderSection,
  // @ts-ignore
  EuiHeaderSectionItem,
  // @ts-ignore
  EuiHeaderSectionItemButton,
  // @ts-ignore
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  // @ts-ignore
  EuiNavDrawerGroup,
  // @ts-ignore
  EuiNavDrawer,
  EuiHorizontalRule,
  // @ts-ignore
  EuiShowFor,
} from '@elastic/eui';
// @ts-ignore
import euiLightTheme from '@elastic/eui/es/theme_light';
// @ts-ignore
import euiDarkTheme from '@elastic/eui/es/theme_dark';
// @ts-ignore
import PropagateContext from '@elastic/eui/es/services/propagate/propagate_context';

import { TopLinks } from '../navigation_links/top_links';
import { SolutionLinks } from '../navigation_links/solution_links';
import { ExploreLinks } from '../navigation_links/explore_links';
import { AdminLinks } from '../navigation_links/admin_links';

export const ThemeContext = React.createContext('dark');

if (localStorage.getItem('theme') === 'dark') {
  require('../../themes/theme_dark.scss');
} else {
  require('../../themes/theme_light.scss');
}

export default class Chrome extends React.Component<any, any> {
  navDrawerRef: any;
  initialTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

  constructor(props: any) {
    super(props);
    this.state = {
      theme: this.initialTheme,
      themeIsLoading: false,
      emotionTheme:
        this.initialTheme === 'dark'
          ? // Can do a better job of initalizing. Currently the light theme is needed as a base.
            euiDarkTheme(euiLightTheme())
          : euiLightTheme(),
    };
  }

  handleChangeTheme = () => {
    const nextTheme = this.state.theme === 'light' ? 'dark' : 'light';

    const emotionTheme =
      nextTheme === 'light'
        ? euiLightTheme(this.state.emotionTheme)
        : euiDarkTheme(this.state.emotionTheme);

    this.setState(
      {
        theme: nextTheme,
        themeIsLoading: true,
        emotionTheme,
      },
      () => {
        localStorage.setItem('theme', nextTheme);
        window.location.reload();
      }
    );
  };

  renderLogo() {
    return (
      <EuiHeaderLogo
        iconType="logoElastic"
        href="/#/chrome/nav-drawer"
        aria-label="Goes to home"
      />
    );
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={() => this.navDrawerRef.toggleOpen()}>
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Home',
        href: '#',
        onClick: (e: { preventDefault: () => void }) => {
          e.preventDefault();
          console.log('You clicked home');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  setNavDrawerRef = (ref: any) => (this.navDrawerRef = ref);

  render() {
    const themeIcon = this.state.isDarkTheme ? sun : moon;

    return (
      <PropagateContext.Provider value={this.state.emotionTheme}>
        <ThemeContext.Provider value={this.state.theme}>
          <div>
            <EuiHeader className="chrHeader">
              <EuiHeaderSection grow={false}>
                <EuiShowFor sizes={['xs', 's']}>
                  <EuiHeaderSectionItem border="right">
                    {this.renderMenuTrigger()}
                  </EuiHeaderSectionItem>
                </EuiShowFor>
                <EuiHeaderSectionItem border="right">
                  {this.renderLogo()}
                </EuiHeaderSectionItem>
                <EuiHeaderSectionItem border="right">
                  {/* <HeaderSpacesMenu /> */}
                </EuiHeaderSectionItem>
              </EuiHeaderSection>

              {this.renderBreadcrumbs()}

              <EuiHeaderSection side="right">
                <EuiHeaderSectionItem className="chrHeader__themeSection">
                  <EuiButton
                    size="s"
                    iconType={themeIcon}
                    onClick={() => this.handleChangeTheme()}
                    isLoading={this.state.themeIsLoading}>
                    Switch Theme
                  </EuiButton>
                </EuiHeaderSectionItem>
              </EuiHeaderSection>
            </EuiHeader>
            <EuiNavDrawer ref={this.setNavDrawerRef}>
              <EuiNavDrawerGroup listItems={TopLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiNavDrawerGroup listItems={ExploreLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiNavDrawerGroup listItems={SolutionLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiNavDrawerGroup listItems={AdminLinks} />
            </EuiNavDrawer>
            <div className="chrWrap">{this.props.children}</div>
          </div>
        </ThemeContext.Provider>
      </PropagateContext.Provider>
    );
  }
}

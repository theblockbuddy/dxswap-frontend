import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useNativeCurrencyBalances } from '../../state/wallet/hooks'

import Settings from '../Settings'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import { useTranslation } from 'react-i18next'
import MobileOptions from './MobileOptions'
import { useNativeCurrency } from '../../hooks/useNativeCurrency'

import { useWeb3React } from '@web3-react/core'
import { ExternalLink, TYPE } from '../../theme'
import esptLogo from '../../assets/svg/esptsvg.svg'
import { Text } from 'rebass'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const MoreLinksIcon = styled(HeaderElement)`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: flex;
  `};
`

const MobileSettingsWrap = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: block;
    align-items: center;
  `}
`

const DesktopSettingsWrap = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `}
`

const HeaderRow = styled(RowFixed)<{ isDark: boolean }>`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem 0 1rem 0;
  `};
`

const AccountElement = styled.div<{ active: boolean; networkError: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props => (props.networkError ? 'transparent' : ({ theme }) => theme.bg1)};
  border: solid 2px transparent;
  box-sizing: border-box;
  color: ${({ theme }) => theme.yellow1};
  border-radius: 8px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: solid 2px transparent;
  }
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 30px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0px;
  `};
  :hover {
    cursor: pointer;
  }
`

const DXswapIcon = styled.div`
  img {
    margin-left: 5px;
    margin-bottom: -5px;
  }
`

const activeClassName = 'ACTIVE'

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text5};
  width: fit-content;
  margin: 0 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19.5px;

  &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.white};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text5};
  font-weight: 400;
  font-size: 16px;
  line-height: 19.5px;
  width: fit-content;
  text-decoration: none !important;
  margin: 0 12px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

function Header({ history }: { history: any }) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { error } = useWeb3React()

  const nativeCurrency = useNativeCurrency()
  const userNativeCurrencyBalances = useNativeCurrencyBalances(account ? [account] : [])
  const userNativeCurrencyBalance = userNativeCurrencyBalances?.[account || '']
  const [isDark] = useDarkModeManager()
  const styles = {
    fontSize: '8px', // Adjust the font size as needed
    color: 'black',
    marginLeft: '2px' // Change the color to your preference
  }
  return (
    <HeaderFrame>
      <HeaderRow isDark={isDark}>
        <Title href="https://espento.com/">
          <DXswapIcon>
            <img width={150} src={isDark ? esptLogo : esptLogo} alt="logo" />
          </DXswapIcon>
          {/* <TitleText>
            <img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" />
          </TitleText> */}
        </Title>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => history.location.pathname.includes('/swap')}>
            {t('Swap')} <span style={styles}>BETA</span>
          </StyledNavLink>
          {/* <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={() =>
              history.location.pathname.includes('/pool') ||
              history.location.pathname.includes('/add') ||
              history.location.pathname.includes('/remove') ||
              history.location.pathname.includes('/create')
            }
          >
            {t('pool')}
          </StyledNavLink> */}
          <StyledExternalLink id={`stake-nav-link`} href={`https://app.espento.network/addLiquidity`}>
            Liquidity{' '}
            <Text ml="3px" fontSize="11px" marginTop="3px">
              <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                ></path>
              </svg>
            </Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={`https://app.espento.network/`}>
            Bridge
            <Text ml="3px" fontSize="11px" marginTop="3px">
              <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                ></path>
              </svg>
            </Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={`https://app.espento.network/stake`}>
            Stake
            <Text ml="3px" fontSize="11px" marginTop="3px">
              <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                ></path>
              </svg>
            </Text>
          </StyledExternalLink>
          <StyledExternalLink id={`stake-nav-link`} href={`https://www.espento.com/game`}>
            Game
            <Text ml="3px" fontSize="11px" marginTop="3px">
              <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                ></path>
              </svg>
            </Text>
          </StyledExternalLink>{' '}
          <StyledExternalLink id={`stake-nav-link`} href={`https://app.espento.network/affiliate`}>
            Affiliate
            <Text ml="3px" fontSize="11px" marginTop="3px">
              <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                ></path>
              </svg>
            </Text>
          </StyledExternalLink>{' '}
          <MobileSettingsWrap>
            <Settings />
          </MobileSettingsWrap>
          <MoreLinksIcon>
            <MobileOptions history={history} />
          </MoreLinksIcon>
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }} networkError={!!error}>
            {account && userNativeCurrencyBalance ? (
              <TYPE.black
                style={{ flexShrink: 0 }}
                ml="18px"
                mr="12px"
                fontWeight={700}
                fontSize="12px"
                lineHeight="15px"
                letterSpacing="0.08em"
              >
                {userNativeCurrencyBalance?.toSignificant(4)} {nativeCurrency.symbol}
              </TYPE.black>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <DesktopSettingsWrap>
          <Settings />
        </DesktopSettingsWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}

export default withRouter(Header)

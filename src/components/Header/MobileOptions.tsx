import React, { useRef } from 'react'
import styled from 'styled-components'
import { ApplicationModal } from '../../state/application/actions'
import { useCloseModals, useModalOpen, useToggleMobileMenu } from '../../state/application/hooks'
import { darken, transparentize } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Menu } from 'react-feather'
import Modal from '../Modal'
import { Box, Flex } from 'rebass'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ExternalLink } from '../../theme'

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text5};
  width: fit-content;
  height: 36px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19.5px;

  &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.white};
  }
`
const StyledExternalLink = styled(ExternalLink)`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text5};
  font-weight: 400;
  font-size: 16px;
  line-height: 19.5px;
  height: 36px;

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const Wrapper = styled(Flex)`
  width: 100%;
  background: ${({ theme }) => transparentize(0.25, theme.bg2)};
`

export default function MobileOptions({ history }: { history: any }) {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MOBILE)
  const toggle = useToggleMobileMenu()
  const closeModals = useCloseModals()
  const { t } = useTranslation()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Menu size={24} onClick={toggle} />
      <Modal isOpen={open} onDismiss={toggle}>
        <Wrapper flexDirection="column" p="16px 24px">
          <Box>
            <StyledNavLink
              id={`swap-nav-link`}
              to={'/swap'}
              onClick={closeModals}
              isActive={() => history.location.pathname.includes('/swap')}
            >
              {t('swap')}
            </StyledNavLink>
          </Box>
          {/* <Box>
            <StyledNavLink
              id={`pool-nav-link`}
              to={'/pool'}
              onClick={closeModals}
              isActive={() =>
                history.location.pathname.includes('/pools') ||
                history.location.pathname.includes('/add') ||
                history.location.pathname.includes('/remove') ||
                history.location.pathname.includes('/create')
              }
            >
              {t('pool')}
            </StyledNavLink>
          </Box> */}

          <Box>
            <StyledExternalLink id={`stake-nav-link`} href={'https://app.espento.network/addLiquidity'}>
              Liquidity{' '}
              <span style={{ fontSize: '11px', marginTop: '3px', marginLeft: '3px' }}>
                {' '}
                <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                  ></path>
                </svg>
              </span>
            </StyledExternalLink>
          </Box>

          <Box>
            <StyledExternalLink id={`stake-nav-link`} href={'https://app.espento.network/'}>
              Bridge{' '}
              <span style={{ fontSize: '11px', marginTop: '3px', marginLeft: '3px' }}>
                {' '}
                <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                  ></path>
                </svg>
              </span>
            </StyledExternalLink>
          </Box>
          <Box>
            <StyledExternalLink id={`stake-nav-link`} href={'https://app.espento.network/stake'}>
              Stake{' '}
              <span style={{ fontSize: '11px', marginTop: '3px', marginLeft: '3px' }}>
                {' '}
                <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                  ></path>
                </svg>
              </span>
            </StyledExternalLink>
          </Box>
          <Box>
            <StyledExternalLink id={`stake-nav-link`} href={'https://www.espento.com/game'}>
              Game{' '}
              <span style={{ fontSize: '11px', marginTop: '3px', marginLeft: '3px' }}>
                {' '}
                <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                  ></path>
                </svg>
              </span>
            </StyledExternalLink>
          </Box>
          <Box>
            <StyledExternalLink id={`stake-nav-link`} href={'https://app.espento.network/affiliate'}>
              Affiliate{' '}
              <span style={{ fontSize: '11px', marginTop: '3px', marginLeft: '3px' }}>
                {' '}
                <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
                  ></path>
                </svg>
              </span>
            </StyledExternalLink>
          </Box>
        </Wrapper>
      </Modal>
    </StyledMenu>
  )
}

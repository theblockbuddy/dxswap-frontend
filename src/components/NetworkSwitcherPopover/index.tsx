import React, { ReactNode, useCallback, useRef } from 'react';
import { ChainId } from 'dxswap-sdk';
import styled from 'styled-components';
import Option from './Option';
import { ApplicationModal } from '../../state/application/actions';
import { useModalOpen, useCloseModals, useAddPopup } from '../../state/application/hooks';

import EspentoLogo from '../../assets/images/espento-logo.png';
import Popover from '../Popover';
import { useActiveWeb3React } from '../../hooks';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { NETWORK_DETAIL } from '../../constants';
import { CustomNetworkConnector } from '../../connectors/CustomNetworkConnector';

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

export default function NetworkSwitcherPopover({ children }: { children: ReactNode; }) {
  const { connector } = useActiveWeb3React();
  const networkSwitcherPopoverOpen = useModalOpen(ApplicationModal.NETWORK_SWITCHER);
  const popoverRef = useRef(null);
  const addPopup = useAddPopup();
  const closeModals = useCloseModals();
  useOnClickOutside(popoverRef, () => {
    if (networkSwitcherPopoverOpen) closeModals();
  });

  const { chainId, account } = useActiveWeb3React();

  const selectNetwork = useCallback(
    (optionChainId: ChainId) => {
      // if (optionChainId === chainId) return;
      if (!!!account && connector instanceof CustomNetworkConnector) {
        connector.changeChainId(optionChainId);
      }
      if (
        window.ethereum &&
        window.ethereum.isMetaMask &&
        NETWORK_DETAIL[optionChainId] &&
        NETWORK_DETAIL[optionChainId].metamaskAddable
      ) {
        addPopup({ newNetworkChainId: optionChainId });
      }
      closeModals();
    },
    [account, addPopup, chainId, closeModals, connector]
  );

  return (
    <div ref={popoverRef} style={{ marginLeft: '4px' }}>
      <Popover
        content={
          <OptionGrid>
            <Option
              onClick={() => {
                selectNetwork(ChainId.ESPENTO);
              }}
              header={'Espento'}
              logoSrc={EspentoLogo}
            />
          </OptionGrid>
        }
        show={networkSwitcherPopoverOpen}
      >
        {children}
      </Popover>
    </div>
  );
}

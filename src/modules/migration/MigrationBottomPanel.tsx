import { ExclamationIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { getMarketInfoById } from 'src/components/MarketSwitcher';
import { Row } from 'src/components/primitives/Row';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { HFChange } from './HFChange';

interface MigrationBottomPanelProps {
  hfV2Current: string;
  hfV2AfterChange: string;
  hfV3Current: string;
  hfV3AfterChange: string;
  disableButton?: boolean;
  loading?: boolean;
}

export const MigrationBottomPanel = ({
  hfV2Current,
  hfV2AfterChange,
  hfV3Current,
  hfV3AfterChange,
  disableButton,
  loading,
}: MigrationBottomPanelProps) => {
  const { breakpoints } = useTheme();
  const downToSM = useMediaQuery(breakpoints.down('sm'));
  const { currentMarket } = useProtocolDataContext();
  const { market } = getMarketInfoById(currentMarket);

  const { openV3Migration } = useModalContext();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Paper
        sx={{
          p: { xs: '20px', lg: '20px 30px' },
          mb: { xs: 6, md: 0 },
          width: { xs: '100%', md: '45%', lg: '35%' },
        }}
      >
        <Row
          caption={<Trans>Review changes to continue</Trans>}
          captionVariant="h3"
          sx={{ mb: 6 }}
        />

        <HFChange
          caption={<Trans>Health Factor ({market.marketTitle} v2)</Trans>}
          hfCurrent={hfV2Current}
          hfAfter={hfV2AfterChange}
          loading={loading}
        />

        <HFChange
          caption={<Trans>Health Factor ({market.marketTitle} v3)</Trans>}
          hfCurrent={hfV3Current}
          hfAfter={hfV3AfterChange}
          loading={loading}
        />

        <Box
          sx={{
            height: '44px',
            backgroundColor: 'background.surface',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <FormControlLabel
            sx={{ margin: 0 }}
            control={
              <Checkbox
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                size="small"
              />
            }
            label={
              <Typography variant="description" sx={{ position: 'relative', top: 1 }}>
                <Trans>I fully understand the risks of migrating.</Trans>
              </Typography>
            }
          />
        </Box>

        <Box>
          <Button
            onClick={openV3Migration}
            disabled={!isChecked || disableButton}
            sx={{ width: '100%', height: '44px' }}
            variant={!isChecked || disableButton ? 'contained' : 'gradient'}
            size="medium"
          >
            <Trans>Preview tx and migrate</Trans>
          </Button>
        </Box>
      </Paper>
      <Box
        sx={{
          width: { xs: '100%', md: '50%', lg: '60%' },
          padding: '20px 30px',
          mt: downToSM ? 4 : 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: { xs: 4, lg: 6 }, display: 'flex', alignItems: 'center' }}
        >
          <SvgIcon sx={{ fontSize: '24px', color: 'warning.main', mr: 2 }}>
            <ExclamationIcon />
          </SvgIcon>
          <Trans>Migration risks</Trans>
        </Typography>
        <Typography sx={{ mb: { xs: 3, lg: 4 } }}>
          <Trans>
            Please always be aware of your <b>Health Factor (HF)</b> when partially migrating a
            position and that your rates will be updated to V3 rates.
          </Trans>
        </Typography>
        <Typography sx={{ mb: { xs: 3, lg: 4 } }}>
          <Trans>
            Migrating multiple collaterals and borrowed assets at the same time can be an expensive
            operation and might fail in certain situations.
            <b>
              Therefore it’s not recommended to migrate positions with more than 5 assets (deposited
              + borrowed) at the same time.
            </b>
          </Trans>
        </Typography>
        <Typography sx={{ mb: { xs: 4, lg: 6 } }}>
          <Trans>Be mindful of the network congestion and gas prices.</Trans>
        </Typography>
      </Box>
    </Box>
  );
};

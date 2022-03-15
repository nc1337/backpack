import { useState } from "react";
import { Lock } from "@material-ui/icons";
import {
  makeStyles,
  Divider,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { getBackgroundClient } from "../background/client";
import { UI_RPC_METHOD_KEYRING_STORE_UNLOCK } from "../common";

export const NAV_BAR_HEIGHT = 56;

export const useStyles = makeStyles((theme: any) => ({
  container: {
    backgroundColor: theme.custom.colors.background,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  nav: {
    backgroundColor: theme.custom.colors.nav,
    height: `${NAV_BAR_HEIGHT}px`,
    borderBottom: `solid 1pt ${theme.custom.colors.border}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  navTitle: {
    fontSize: "18px",
    color: theme.custom.colors.fontColor,
    fontWeight: 500,
    textAlign: "center",
  },
  header: {
    height: "188px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  passwordField: {
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "12px",
    color: theme.custom.colors.secondary,
    width: "351px",
  },
  passwordFieldContainer: {},
  passwordRoot: {
    marginLeft: "12px",
    marginRight: "12px",
    marginTop: "24px",
    marginBottom: "24px",
    width: "351px",
    borderRadius: "12px",
    backgroundColor: theme.custom.colors.background,
    //    border: `solid 1pt ${theme.custom.colors.border}`,
    //
    "& .MuiOutlinedInput-root": {
      border: `solid 1pt ${theme.custom.colors.border}`,
      borderRadius: "12px",
      height: "56px",
      "& fieldset": {
        border: "none",
      },
    },
  },
  passwordLabel: {
    textAlign: "center",
  },
  errorLabel: {
    color: "red",
  },
  content: {
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    background: "linear-gradient(180deg, #292C33 0%, rgba(41, 44, 51, 0) 100%)",
    height: "258px",
  },
  unlockButton: {
    backgroundColor: theme.custom.colors.onboardButton,
    width: "351px",
    height: "48px",
    color: theme.custom.colors.fontColor,
    borderRadius: "12px",
  },
  headerIcon: {
    color: theme.custom.colors.onboardButton,
  },
  headerTitle: {
    color: theme.custom.colors.fontColor,
    fontSize: "20px",
    fontWeight: 500,
    marginTop: "10px",
    marginBottom: "3px",
  },
  headerSubtitle: {
    color: theme.custom.colors.secondary,
    fontSize: "14px",
    fontWeight: 500,
  },
  lockIcon: {
    color: theme.custom.colors.activeNavButton,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "30px",
  },
  divider: {
    backgroundColor: theme.custom.colors.border,
    width: "91.5px",
  },
  forgotContainer: {
    display: "flex",
    marginLeft: "12px",
    marginRight: "12px",
    marginTop: "38px",
  },
  forgotButton: {
    padding: 0,
    marginLeft: "18px",
    marginRight: "18px",
  },
  forgotButtonTitle: {
    color: theme.custom.colors.secondary,
    textTransform: "none",
    fontSize: "12px",
    fontWeight: 500,
  },
  recoverButton: {
    position: "absolute",
    background: theme.custom.colors.nav,
    width: "351px",
    height: "48px",
    left: "12px",
    bottom: "80px",
    borderRadius: "12px",
  },
  recoverTitle: {
    color: theme.custom.colors.fontColor,
    fontWeight: 500,
    textTransform: "none",
    fontSize: "16px",
  },
}));

export function Locked() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const onUnlock = () => {
    const background = getBackgroundClient();
    background
      .request({
        method: UI_RPC_METHOD_KEYRING_STORE_UNLOCK,
        params: [password],
      })
      .catch(setError);
  };
  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <Typography className={classes.navTitle}>200ms</Typography>
      </div>
      <div className={classes.header}>
        <Lock className={classes.lockIcon} />
        <Typography className={classes.headerTitle}>Unlock Wallet</Typography>
        <Typography className={classes.headerSubtitle}>
          Enter your password to unlock wallet.
        </Typography>
      </div>
      <div className={classes.content}>
        <TextField
          placeholder="Password"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          type="password"
          className={classes.passwordFieldContainer}
          inputProps={{
            className: classes.passwordField,
          }}
          classes={{
            root: classes.passwordRoot,
          }}
          InputLabelProps={{
            shrink: false,
            style: {
              borderRadius: "12px",
            },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography className={classes.errorLabel}>{error}</Typography>
        )}
        <Button
          onClick={onUnlock}
          disableElevation
          variant="contained"
          className={classes.unlockButton}
        >
          <Typography style={{ fontWeight: 500, textTransform: "none" }}>
            Unlock
          </Typography>
        </Button>
        <div>
          <div className={classes.forgotContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Divider className={classes.divider} />
            </div>
            <Button
              disableRipple
              disableElevation
              className={classes.forgotButton}
            >
              <Typography className={classes.forgotButtonTitle}>
                Forgot your password?
              </Typography>
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Divider className={classes.divider} />
            </div>
          </div>
          <Button
            disableRipple
            disableElevation
            className={classes.recoverButton}
          >
            <Typography className={classes.recoverTitle}>
              Recover Wallet with Secret Phrase
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}


// React
import React from 'react';

// Third party
import { Text } from 'native-base';
import { useTranslation } from "react-i18next";
import { Switch, Route, Link, Redirect } from "react-router-native";

// Components
import Session from "../../domains/Session";
import SessionList from "../../domains/Session/components/List";
import Configuation from '../../domains/Configuration';

export const MainRouter = ({ serviceState }) => {
  const { session } = serviceState || {};

  return (
    <Switch>
      <Route path={"/current-session"} exact={true} render={() => <Session session={session} />} />
      <Route path={"/sessions"} exact={true} component={SessionList} />
      <Route path={"/config"} exact={true} component={Configuation} />
      <Redirect to={"/sessions"} />
    </Switch>
  )
}

export const Menu = ({ serviceState }) => {
  const { t } = useTranslation();
  const { started = false, session } = serviceState || {};

  return (
    <>
      {started && session && (
        <Link to={'/current-session'}>
          <Text>{t('nav:current-session')}</Text>
        </Link>
      )}
      <Link to={'/sessions'}>
        <Text>{t('nav:sessions')}</Text>
      </Link>
      <Link to={'/config'}>
        <Text>{t('nav:config')}</Text>
      </Link>
    </>
  )
};
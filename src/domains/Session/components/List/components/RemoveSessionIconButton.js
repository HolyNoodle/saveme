// React
import React, { useState } from "react";

// Third party
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/core";
import { Alert, ToastAndroid } from "react-native";

// Components
import { SecondaryIconButton } from "../../../../../components/Layout";
import { SecondaryLoadingIconButton } from "../../../../../components/Loader";

// State
import { useOvermind } from "../../../../../state";

const RemoveSessionIconButton = ({ session }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [removing, setRemoving] = useState(false);
  const {
    actions: {
      sessions: { removeSession },
    },
  } = useOvermind();

  const handleRemove = async () => {
    try {
      await removeSession(session);
    } catch (ex) {
      ToastAndroid.show(t("session:remove-session-error"));
      console.error(ex);
    }

    setRemoving(false);

    navigation.navigate("sessions", { screen: "list" });
  };

  const handlePress = () => {
    setRemoving(true);
    Alert.alert(
      t("sessions:confirm-remove-title"),
      t("sessions:confirm-remove-title"),
      [
        {
          text: t("common:actions-cancel"),
          onPress: () => setRemoving(false),
        },
        {
          text: t("common:actions-ok"),
          onPress: handleRemove,
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setRemoving(false),
        onPress: () => setRemoving(false),
      }
    );
  };
  return !removing ? (
    <SecondaryIconButton name="delete" type="AntDesign" onPress={handlePress} />
  ) : (
    <SecondaryLoadingIconButton />
  );
};

export default RemoveSessionIconButton;

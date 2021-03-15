// React
import React from "react";

// Third party
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/core";

// Components
import { SecondaryIconButton } from "../../../../../components/Layout";

// State
import { useOvermind } from "../../../../../state";
import { removeSession } from "../../../utils";
import { Alert } from "react-native";

const RemoveSessionIconButton = ({ session }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    actions: {
      sessions: { invalidateSessions },
    },
  } = useOvermind();

  const handlePress = () => {
    Alert.alert(
      t("sessions:confirm-remove-title"),
      t("sessions:confirm-remove-title"),
      [
        {
          text: t("common:actions-cancel"),
        },
        {
          text: t("common:actions-ok"),
          onPress: async () => {
            await removeSession(session);
            invalidateSessions();

            navigation.navigate("sessions", { screen: "list" });
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <SecondaryIconButton name="delete" type="AntDesign" onPress={handlePress} />
  );
};

export default RemoveSessionIconButton;

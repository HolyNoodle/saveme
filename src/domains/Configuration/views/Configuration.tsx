import React from "react";

// Third party
import debounce from "lodash/debounce";
import { View } from "native-base";
import { ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";

// State
import { useOvermind } from "../../../state";

// Components
import EntityList from "../../../components/EntityList";
import TimelineItem from "../components/TimelineItem";
import Recorders from "../components/Recorders";
import { Configuration } from "../types";

const Configuation: React.FunctionComponent<any> = () => {
  const { t } = useTranslation();
  const {
    state: {
      configuration: { configuration },
    },
    actions: {
      configuration: { writeConfiguration },
    },
  } = useOvermind();

  const handleFieldUpdate = (field: string) => debounce(async (value: any) => {
    try {
      await writeConfiguration({ [field]: value });

      ToastAndroid.show(t("config:saved-success"), ToastAndroid.SHORT);
    } catch (ex) {
      console.error("ERROR while writing configuration", ex);
      ToastAndroid.show(t("config:saved-error"), ToastAndroid.SHORT);
    }
  }, 500);

  const { timeline = [] } = configuration as Configuration;

  const sortedTimeline = [...timeline].sort(
    ({ triggerTime: tA }, { triggerTime: tB }) => parseInt(tA, 10) - parseInt(tB, 10)
  );

  return (
    <View>
      <Recorders
        configuration={configuration}
        onFieldUpdate={handleFieldUpdate}
      />
      <EntityList
        values={sortedTimeline}
        onChange={handleFieldUpdate("timeline")}
        translationSuffix={"config"}
        component={TimelineItem}
      />
    </View>
  );
};

export default Configuation;

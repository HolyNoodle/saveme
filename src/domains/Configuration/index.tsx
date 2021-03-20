// React
import React, { useEffect } from "react";

// State
import { useOvermind } from "../../state";

// Components
import Configuration from "./views/Configuration";
import Loader from "../../components/Loader";

const ConfigurationDomain = () => {
  const {
    state: {
      configuration: { invalid, loading },
    },
    actions: {
      configuration: { readConfiguration },
    },
  } = useOvermind();

  useEffect(() => {
    if (invalid) {
        readConfiguration();
    }
  }, [invalid]);

  return loading ? (
    <Loader />
  ) : (
    <Configuration />
  );
};

export default ConfigurationDomain;

// Components
import { SMS, Unknown } from "./components/Icons";
import SMSActorConfig, { SMSActorDetails } from "./components/SMSActorConfig";

// Types
import { TFunction } from "i18next";

export const actorComponents = {
  undefined: {
    icon: Unknown,
  },
  "com.saveme.session.actors.SMSActor": {
    icon: SMS,
    form: SMSActorConfig,
    details: SMSActorDetails,
    getDefaultExtra: (t: TFunction) => ({
      number: t('config:sms-default-number'),
      message: t('config:sms-default-message'),
    })
  },
};

import React from "/vendor/react";
import { compose, setDisplayName, defaultProps } from "recompose";

import { PublishIcon } from "/lib/component/icon";
import MenuItem from "./MenuItem";

const enhance = compose(
  setDisplayName("ToolbarMenuItems.Publish"),
  defaultProps({
    title: "Publish",
    description: "Publish target item(s).",
    icon: <PublishIcon />,
  }),
);
export default enhance(MenuItem);

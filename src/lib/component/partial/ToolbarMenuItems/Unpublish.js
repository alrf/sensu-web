import React from "/vendor/react";
import { compose, setDisplayName, defaultProps } from "recompose";

import { UnpublishIcon } from "/lib/component/icon";
import MenuItem from "./MenuItem";

const enhance = compose(
  setDisplayName("ToolbarMenuItems.Unpublish"),
  defaultProps({
    title: "Unpublish",
    description: "Unpublish target item(s).",
    icon: <UnpublishIcon />,
  }),
);
export default enhance(MenuItem);

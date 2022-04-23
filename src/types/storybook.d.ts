import { ComponentStoryObj } from "@storybook/react";
import type { ComponentProps, FunctionComponent } from "react";

type CSFType<C> = C extends FunctionComponent<any>
  ? ComponentStoryObj<C> & {
      args: ComponentProps<C>;
    }
  : never;

export { CSFType };

import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { Tag16h5 } from "./binaryCodeLists/Tag16h5";

const LAYOUT = createLayout(
  [
    "wwwwwwww",
    "wbbbbbbw",
    "wbddddbw",
    "wbddddbw",
    "wbddddbw",
    "wbddddbw",
    "wbbbbbbw",
    "wwwwwwww",
  ],
  Tag16h5
);

export class AprilTag16h5 extends AprilTag {
  /**
   * The name of this AprilTag family, "16h5".
   */
  public readonly familyName = "16h5";
  /**
   * The maximum ID in this family (exclusive). Codes for 16h5 range from 0 to 30.
   */
  public readonly maxId = 30;
  public readonly size = 8;

  protected readonly layout = LAYOUT;
}

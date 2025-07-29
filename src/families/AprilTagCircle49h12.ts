import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { TagCircle49h12 } from "./binaryCodeLists/TagCircle49h12";

const LAYOUT = createLayout(
  [
    "xxxxdddxxxx",
    "xxdddddddxx",
    "xdbbbbbbbdx",
    "xdbwwwwwbdx",
    "ddbwdddwbdd",
    "ddbwdddwbdd",
    "ddbwdddwbdd",
    "xdbwwwwwbdx",
    "xdbbbbbbbdx",
    "xxdddddddxx",
    "xxxxdddxxxx",
  ],
  TagCircle49h12,
  "rotatedQuadrants"
);

export class AprilTagCircle49h12 extends AprilTag {
  /**
   * The name of this AprilTag family, "Circle49h12".
   */
  public readonly familyName = "Circle49h12";
  /**
   * The maximum ID in this family (exclusive). Codes for Circle49h12 range from 0 to 65698.
   */
  public readonly maxId = 65698;
  public readonly size = 11;

  protected readonly layout = LAYOUT;
}

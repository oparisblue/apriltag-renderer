import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { TagStandard41h12 } from "./binaryCodeLists/TagStandard41h12";

const LAYOUT = createLayout(
  [
    "ddddddddd",
    "dbbbbbbbd",
    "dbwwwwwbd",
    "dbwdddwbd",
    "dbwdddwbd",
    "dbwdddwbd",
    "dbwwwwwbd",
    "dbbbbbbbd",
    "ddddddddd",
  ],
  TagStandard41h12,
  "rotatedQuadrants"
);

export class AprilTagStandard41h12 extends AprilTag {
  /**
   * The name of this AprilTag family, "Standard41h12".
   */
  public readonly familyName = "Standard41h12";
  /**
   * The maximum ID in this family (exclusive). Codes for Standard41h12 range from 0 to 2115.
   */
  public readonly maxId = 2115;
  public readonly size = 9;

  protected readonly layout = LAYOUT;
}

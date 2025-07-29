import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { TagStandard52h13 } from "./binaryCodeLists/TagStandard52h13";

const LAYOUT = createLayout(
  [
    "dddddddddd",
    "dbbbbbbbbd",
    "dbwwwwwwbd",
    "dbwddddwbd",
    "dbwddddwbd",
    "dbwddddwbd",
    "dbwddddwbd",
    "dbwwwwwwbd",
    "dbbbbbbbbd",
    "dddddddddd",
  ],
  TagStandard52h13,
  "rotatedQuadrants"
);

export class AprilTagStandard52h13 extends AprilTag {
  /**
   * The name of this AprilTag family, "Standard52h13".
   */
  public readonly familyName = "Standard52h13";
  /**
   * The maximum ID in this family (exclusive). Codes for Standard52h13 range from 0 to 48714.
   */
  public readonly maxId = 48714;
  public readonly size = 10;

  protected readonly layout = LAYOUT;
}

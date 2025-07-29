import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { TagCustom48h12 } from "./binaryCodeLists/TagCustom48h12";

const LAYOUT = createLayout(
  [
    "dddddddddd",
    "dbbbbbbbbd",
    "dbwwwwwwbd",
    "dbwddddwbd",
    "dbwdxxdwbd",
    "dbwdxxdwbd",
    "dbwddddwbd",
    "dbwwwwwwbd",
    "dbbbbbbbbd",
    "dddddddddd",
  ],
  TagCustom48h12,
  "rotatedQuadrants"
);

export class AprilTagCustom48h12 extends AprilTag {
  /**
   * The name of this AprilTag family, "Custom48h12".
   */
  public readonly familyName = "Custom48h12";
  /**
   * The maximum ID in this family (exclusive). Codes for Custom48h12 range from 0 to 42211.
   */
  public readonly maxId = 42211;
  public readonly size = 10;

  protected readonly layout = LAYOUT;
}

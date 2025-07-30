import { A as AprilTag, L as Layout } from './AprilTag-O5k2LP1M.js';

declare class AprilTag36h9 extends AprilTag {
    /**
     * The name of this AprilTag family, "36h9".
     */
    readonly familyName = "36h9";
    /**
     * The maximum ID in this family (exclusive). Codes for 36h9 range from 0 to 5329.
     */
    readonly maxId = 5329;
    readonly size = 10;
    protected readonly layout: Layout;
}

export { AprilTag36h9 };

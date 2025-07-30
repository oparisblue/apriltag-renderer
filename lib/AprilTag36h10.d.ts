import { A as AprilTag, L as Layout } from './AprilTag-O5k2LP1M.js';

declare class AprilTag36h10 extends AprilTag {
    /**
     * The name of this AprilTag family, "36h10".
     */
    readonly familyName = "36h10";
    /**
     * The maximum ID in this family (exclusive). Codes for 36h10 range from 0 to 2320.
     */
    readonly maxId = 2320;
    readonly size = 10;
    protected readonly layout: Layout;
}

export { AprilTag36h10 };

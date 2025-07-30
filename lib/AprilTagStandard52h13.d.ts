import { A as AprilTag, L as Layout } from './AprilTag-O5k2LP1M.js';

declare class AprilTagStandard52h13 extends AprilTag {
    /**
     * The name of this AprilTag family, "Standard52h13".
     */
    readonly familyName = "Standard52h13";
    /**
     * The maximum ID in this family (exclusive). Codes for Standard52h13 range from 0 to 48714.
     */
    readonly maxId = 48714;
    readonly size = 10;
    protected readonly layout: Layout;
}

export { AprilTagStandard52h13 };

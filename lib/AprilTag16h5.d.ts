import { A as AprilTag, L as Layout } from './AprilTag-O5k2LP1M.js';

declare class AprilTag16h5 extends AprilTag {
    /**
     * The name of this AprilTag family, "16h5".
     */
    readonly familyName = "16h5";
    /**
     * The maximum ID in this family (exclusive). Codes for 16h5 range from 0 to 30.
     */
    readonly maxId = 30;
    readonly size = 8;
    protected readonly layout: Layout;
}

export { AprilTag16h5 };

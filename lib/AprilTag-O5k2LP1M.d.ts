interface Layout {
    /** b=always black, w=always white, x=transparent, d=data */
    pattern: string[];
    bitCount: number;
    codes: bigint[];
    render: "simple" | "rotatedQuadrants";
}

type Bit = "b" | "w" | "x";
interface RenderOptions {
    blackColor?: string;
    whiteColor?: string;
}
declare abstract class AprilTag {
    abstract readonly familyName: string;
    abstract readonly maxId: number;
    /**
     * All AprilTags are square, so this is both the width and height of the tag in cells.
     */
    abstract readonly size: number;
    protected abstract readonly layout: Layout;
    /**
     * @returns `true` if the given ID has a valid code in this AprilTag family.
     */
    isIdInRange(id: number): boolean;
    protected assertIdInRange(id: number): void;
    /**
     * Gets a bitmap representation of the AprilTag for the given ID in this family.
     *
     * This is useful if you want to build your own renderer, rather than using one of the ones provided.
     *
     * The bitmap is represented as a square 2d array of values. Each value represents one "cell" on the AprilTag,
     * where "w" is white, "b" is black, and "x" is transparent. You can index the grid using [y][x] to get the value
     * for that cell on the tag.
     *
     * @throws If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
     */
    getBitmap(id: number): Bit[][];
    private getSimpleBitmap;
    private getRotatedQuadrantsBitmap;
    private rotate90;
    private renderBit;
    /**
     * Renders a given tag ID to a Unicode string that you can use in e.g. a CLI or terminal.
     *
     * This example shows an AprilTag16h5, but it is representative of the style of textual output:
     * ```
     *
     *  ██████
     *  ███ ██
     *  ███  █
     *  ████ █
     *  █ █  █
     *  ██████
     *
     *
     * ```
     * @throws If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
     */
    renderToText(id: number): string;
    /**
     * Renders the tag for a given ID onto a canvas. Works with both HTML5 canvases on web, and with the "canvas" package for node.
     *
     * ## Drawing the tag across the entire canvas
     *
     * By default, it fills the entire canvas with the tag, scaling up/down to fit. Note that it will not stretch the tag: as such,
     * non-square canvases or canvases that aren't a multiple of {@link size} will throw an error.
     *
     * ```
     * const canvas = document.createElement("canvas");
     * canvas.width = 80;
     * canvas.height = 80;
     *
     * aprilTagFamily.renderToCanvas(0, canvas); // where 0 is the tag id
     * ```
     *
     * ## Drawing the tag to a portion of the canvas
     *
     * You can choose to draw the tag to a portion of the canvas by passing a `position` option. In this case, it will leave the rest
     * of the canvas untouched.
     *
     * ```
     * aprilTagFamily.renderToCanvas(0, canvas, { position: { x: 1, y: 1, size: 80 } }); // where 0 is the tag id
     * ```
     *
     * Every item in `position` is required. The top-left corner of the tag will be placed at the position represented by (x,y ).
     * The size of the tag (width and height) will be equal to `size` --- and, as such, if the given size is not a multiple of
     * {@link size}, then an error will be thrown.
     *
     * ## Changing the colours
     *
     * You can also pass in one or more of the optional `blackColor`, `whiteColor` and `transparentColor` options to change the
     * respective colours. The transparent colour is only used for the cutouts present in some tag families: Circle21h7,
     * Circle49h12, and Custom48h12.
     *
     * ```
     * aprilTagFamily.renderToCanvas(0, canvas, { blackColor: "red", whiteColor: "blue" }); // where 0 is the tag id
     * ```
     *
     * ## Generating a PNG
     *
     * Here is a quick example of how you could use this to make an AprilTag PNG using node-canvas:
     *
     * @example
     * const canvas = createCanvas(80, 80);
     * new AprilTag16h5().renderToCanvas(0, canvas); // where 0 is the tag id
     * const png = canvas.toBuffer();
     * fs.writeFileSync("test.png", png);
     *
     * @param id The tag ID to render
     * @param canvas Either a HTML5 canvas, or a canvas object from node-canvas
     * @param options Options for colours and positioning, as described above. Optional.
     * @throws
     *   - If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
     *   - If the canvas is not square or its size is not a multiple of the {@link size} --- or same for the position option
     *     when in use.
     *   - If a 2d canvas context cannot be obtained.
     */
    renderToCanvas(id: number, canvas: {
        width: number;
        height: number;
        getContext: (context: "2d") => any;
    }, options?: RenderOptions & {
        position?: {
            x: number;
            y: number;
            size: number;
        };
    }): void;
    private getPathRects;
    private drawPath;
    /**
     * Render the tag for a given ID as an SVG string.
     *
     * You can adjust the colours using the optional second parameter.
     *
     * @throws If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
     */
    renderToSvg(id: number, options?: RenderOptions): string;
    private createSvgPath;
}

export { AprilTag as A, type Layout as L };

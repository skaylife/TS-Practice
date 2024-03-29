"use strict";
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["Png"] = "png";
    ImageFormat["Jpeg"] = "jpeg";
})(ImageFormat || (ImageFormat = {}));
class ImageBuilder {
    constructor() {
        this.formats = [];
        this.resolutions = [];
    }
    addPng() {
        if (this.formats.includes(ImageFormat.Png)) {
            return this;
        }
        this.formats.push(ImageFormat.Png);
        return this;
    }
    addJpeg() {
        if (this.formats.includes(ImageFormat.Jpeg)) {
            return this;
        }
        this.formats.push(ImageFormat.Png);
        return this;
    }
    addResolution(width, height) {
        this.resolutions.push({ width, height });
        return this;
    }
    build() {
        const res = [];
        for (const r of this.resolutions) {
            for (const f of this.formats) {
                res.push({ width: r.width,
                    height: r.height,
                    format: f });
            }
        }
        return res;
    }
}
console.log(new ImageBuilder()
    .addJpeg()
    .addPng()
    .addResolution(100, 50)
    .addResolution(100, 80)
    .build());

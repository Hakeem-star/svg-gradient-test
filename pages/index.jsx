import { folder, useControls } from "leva";

function HomePage() {
  const { color: mainColor, show: mainShow } = useControls("Main", {
    color: { h: 0, s: 100, l: 50 },
    show: true,
  });
  const { color: smallBlobColor, show: smallShow } = useControls(
    "Small blobs",
    {
      color: { h: 35, s: 93, l: 46 },
      show: true,
    }
  );
  const { color: randomBlobColor, show: randomShow } = useControls(
    "Random blobs",
    {
      color: { h: 0, s: 100, l: 50 },
      show: true,
    }
  );
  const { color: backgroundColor, show: backgroundShow } = useControls(
    "Background",
    {
      color: { h: 0, s: 0, l: 100 },
      show: true,
    }
  );

  return (
    <svg style={{ width: "100vh", height: "100vh", margin: "0 auto" }}>
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="main-blobs-gradient"
          gradientTransform="rotate(150, 0.5, 0.5)"
        >
          <stop
            stop-color={`hsl(${mainColor.h}, ${mainColor.s}%, ${mainColor.l}%)`}
            stop-opacity="1"
            offset="0%"
          ></stop>
        </linearGradient>

        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="small-blobs-gradient"
          gradientTransform="rotate(150, 0.5, 0.5)"
        >
          <stop
            stop-color={`hsl(${smallBlobColor.h}, ${smallBlobColor.s}%, ${smallBlobColor.l}%)`}
            stop-opacity="1"
            offset="0%"
          ></stop>
        </linearGradient>

        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="random-blobs-gradient"
          gradientTransform="rotate(150, 0.5, 0.5)"
        >
          <stop
            stop-color={`hsl(${randomBlobColor.h}, ${randomBlobColor.s}%, ${randomBlobColor.l}%)`}
            stop-opacity="1"
            offset="0%"
          ></stop>
        </linearGradient>

        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="background-gradient"
          gradientTransform="rotate(150, 0.5, 0.5)"
        >
          <stop
            stop-color={`hsl(${backgroundColor.h}, ${backgroundColor.s}%, ${backgroundColor.l}%)`}
            stop-opacity="1"
            offset="0%"
          ></stop>
        </linearGradient>

        <filter
          id="background-blobs"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0012 0.0012"
            numOctaves="2"
            seed="29"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>
        </filter>

        <filter
          id="main-blobs"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.0023 0.0022"
            numOctaves="4"
            seed="3"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>

          <feColorMatrix
            in="cloudbase"
            type="hueRotate"
            values="0"
            result="cloud"
          >
            <animate
              attributeName="values"
              from="0"
              to="360"
              dur="10s"
              repeatCount="indefinite"
            />
          </feColorMatrix>

          <feColorMatrix
            in="cloud"
            result="wispy"
            type="matrix"
            values="4 0 0 0 0
                    4 0 0 0 0
                    4 0 0 0 0
                    1 0 0 0 0   
                    "
          />

          <feComponentTransfer result="compTransfer">
            {/* controls the distribution between blobs and spaces */}
            <feFuncA type="table" tableValues="-0.29 2" />
          </feComponentTransfer>

          <feGaussianBlur
            stdDeviation="20 20"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="compTransfer"
            result="blur"
            edgeMode="duplicate"
          ></feGaussianBlur>

          <feComposite
            in="SourceGraphic"
            in2="blur"
            operator="in"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="composite4"
          />
        </filter>

        <filter
          id="small-blobs"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.0012 0.0013"
            numOctaves="2"
            seed="102"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>

          <feGaussianBlur
            stdDeviation="30 0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            edgeMode="duplicate"
            in="turbulence"
            result="blur"
          ></feGaussianBlur>

          <feComposite
            in="SourceGraphic"
            in2="blur"
            operator="in"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="composite4"
          />
        </filter>

        <filter
          id="random-blobs"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.0013 0.00192"
            numOctaves="2"
            seed="290"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>

          <feComponentTransfer result="compTransfer">
            {/* controls the distribution between blobs and spaces */}
            <feFuncA type="table" tableValues="-0.29 2" />
          </feComponentTransfer>
          <feGaussianBlur
            stdDeviation="20 20"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="compTransfer"
            result="blur"
            edgeMode="duplicate"
          ></feGaussianBlur>
          <feComposite
            in="SourceGraphic"
            in2="blur"
            operator="in"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="composite4"
          />
        </filter>

        <rect
          id="background-blobs-image"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#background-gradient)"
          // filter="url(#background-blobs)"
        />

        <rect
          id="main-blobs-image"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#main-blobs-gradient)"
          filter="url(#main-blobs)"
        />
        <rect
          id="small-blobs-image"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#small-blobs-gradient)"
          filter="url(#small-blobs)"
        />

        <rect
          id="random-blobs-image"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#random-blobs-gradient)"
          filter="url(#random-blobs)"
        />

        <filter
          id="all-blobs"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feImage
            xlinkHref="#main-blobs-image"
            result="main-blobs"
            x="0"
            y="0"
          />
          <feImage
            xlinkHref="#small-blobs-image"
            result="small-blobs"
            x="0"
            y="0"
          />

          <feImage
            xlinkHref="#random-blobs-image"
            result="random-blobs"
            x="0"
            y="0"
          />

          <feImage
            xlinkHref="#background-blobs-image"
            result="background-blobs"
            x="0"
            y="0"
          />

          <feMerge x="0%" y="0%" width="100%" height="100%" result="merge">
            {backgroundShow && <feMergeNode in="background-blobs" />}
            {mainShow && <feMergeNode in="main-blobs" />}
            {smallShow && <feMergeNode in="small-blobs" />}
            {randomShow && <feMergeNode in="random-blobs" />}
          </feMerge>
        </filter>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="red"
        filter="url(#all-blobs)"
      ></rect>
    </svg>
  );
}

export default HomePage;

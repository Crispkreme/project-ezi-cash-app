import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
const Logo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={52}
    height={49}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h52v49H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.002 0 0 .00212 0 -.03)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={500}
        height={500}
      />
    </Defs>
  </Svg>
)
export default Logo
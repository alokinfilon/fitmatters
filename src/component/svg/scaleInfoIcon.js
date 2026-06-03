import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ScaleInfoIcon = ({ size = 24, color = "black", strokeWidth = 2, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Keeps your grid and calibration lines perfectly aligned
    fill="none"
    {...props}
  >
    <Path
      d="M12 15V11.986"
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 15V11.986"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 6H4"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 8V4"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 8V4"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 15V11.986"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 12H4C3.44772 12 3 12.4477 3 13V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V13C21 12.4477 20.5523 12 20 12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ScaleInfoIcon;

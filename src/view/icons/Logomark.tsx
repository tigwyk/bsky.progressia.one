import Svg, {Path, type PathProps, Rect, type SvgProps} from 'react-native-svg'

import {usePalette} from '#/lib/hooks/usePalette'

const ratio = 1 // Square aspect ratio for P1 logo

export function Logomark({
  fill,
  ...rest
}: {fill?: PathProps['fill']} & SvgProps) {
  const pal = usePalette('default')
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32, 10)

  return (
    <Svg
      fill="none"
      viewBox="0 0 256 256"
      {...rest}
      width={size}
      height={Number(size) * ratio}>
      {/* Background circle */}
      <Path
        d="M128 8 A120 120 0 1 1 128 248 A120 120 0 1 1 128 8 Z"
        fill={pal.view.backgroundColor}
        stroke={fill || pal.text.color}
        strokeWidth="4"
      />

      {/* Stylized P */}
      <Path
        d="M60 80 L60 200 L80 200 L80 150 L120 150 C140 150 156 134 156 114 C156 94 140 80 120 80 L60 80 Z M80 100 L120 100 C129 100 136 107 136 114 C136 121 129 130 120 130 L80 130 L80 100 Z"
        fill={fill || pal.text.color}
      />

      {/* Stylized 1 */}
      <Rect
        x="180"
        y="80"
        width="20"
        height="120"
        fill={fill || pal.text.color}
      />
      <Rect
        x="160"
        y="80"
        width="40"
        height="20"
        fill={fill || pal.text.color}
      />

      {/* Accent element */}
      <Path d="M200 84 A6 6 0 1 1 200 96 A6 6 0 1 1 200 84 Z" fill="#01AAEE" />
    </Svg>
  )
}

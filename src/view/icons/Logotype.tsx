import Svg, {type PathProps, type SvgProps, Text} from 'react-native-svg'

import {usePalette} from '#/lib/hooks/usePalette'

const ratio = 0.5 // Aspect ratio for P1 text logo

export function Logotype({
  fill,
  ...rest
}: {fill?: PathProps['fill']} & SvgProps) {
  const pal = usePalette('default')
  const size = parseInt(rest.width as string, 10) || 120

  return (
    <Svg
      fill="none"
      viewBox="0 0 240 120"
      width={size}
      height={size * ratio}
      {...rest}>
      <Text
        x="120"
        y="60"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="80"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fill={fill || pal.text.color}>
        P1
      </Text>
    </Svg>
  )
}

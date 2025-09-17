import React from 'react'
import {StyleSheet, type TextProps} from 'react-native'
import Svg, {
  G,
  Path,
  type PathProps,
  Rect,
  type SvgProps,
} from 'react-native-svg'

import {useTheme} from '#/alf'

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export const Logo = React.forwardRef(function LogoImpl(props: Props, ref) {
  const {fill, ...rest} = props
  const styles = StyleSheet.flatten(props.style)
  const t = useTheme()
  const _fill = fill || styles?.color || t.atoms.text.color
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32, 10)

  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="0 0 256 256"
      {...rest}
      style={[{width: size, height: size}, styles]}>
      {/* Background circle */}
      <G>
        <Path
          d="M128 8 A120 120 0 1 1 128 248 A120 120 0 1 1 128 8 Z"
          fill={t.atoms.bg.backgroundColor}
          stroke={_fill}
          strokeWidth="4"
        />

        {/* Stylized P */}
        <Path
          d="M60 80 L60 200 L80 200 L80 150 L120 150 C140 150 156 134 156 114 C156 94 140 80 120 80 L60 80 Z M80 100 L120 100 C129 100 136 107 136 114 C136 121 129 130 120 130 L80 130 L80 100 Z"
          fill={_fill}
        />

        {/* Stylized 1 */}
        <Rect x="180" y="80" width="20" height="120" fill={_fill} />
        <Rect x="160" y="80" width="40" height="20" fill={_fill} />

        {/* Accent element */}
        <Path
          d="M200 84 A6 6 0 1 1 200 96 A6 6 0 1 1 200 84 Z"
          fill="#01AAEE"
        />
      </G>
    </Svg>
  )
})

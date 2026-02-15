import { Link } from 'expo-router';

import { useThemeColor } from '../hooks/useThemeColor';

// interface Props extends LinkProps<string | object> {}

const ThemedLink = ({ style, ...rest }: any) => {
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <Link
      style={[
        {
          color: primaryColor,
        },
        style,
      ]}
      {...rest}
    />
  );
};
export default ThemedLink;

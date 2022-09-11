import { TouchableHighlight, Image, Dimensions } from "react-native";
import { List } from "react-native-paper";

import { defaultStyles } from "../config";

const ListItem = ({
  label,
  icon,
  image,
  description,
  rightIcon,
  onPress,
  color,
}) => {
  const handleLeftProp = (props) => {
    if (image) return <Image source={image} style={defaultStyles.image} />;
    return icon && <List.Icon {...props} icon={icon} />;
  };

  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ededed"}>
      <List.Item
        title={label}
        style={{
          width: Dimensions.get("screen").width,
        }}
        titleStyle={[defaultStyles.listItemTitle, { color: color }]}
        description={description ? description : null}
        descriptionStyle={[defaultStyles.listItemDescription, { color: color }]}
        left={(props) => handleLeftProp(props)}
        right={(props) =>
          rightIcon ? <List.Icon {...props} icon={rightIcon} /> : null
        }
      />
    </TouchableHighlight>
  );
};

export default ListItem;

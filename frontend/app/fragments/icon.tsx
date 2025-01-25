import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { IconProps } from "react-native-vector-icons/Icon";

type IconLibrary = {
    [key: string]: React.ComponentType<IconProps>;
};

const iconLibraries: IconLibrary = {
    "ionicon": Ionicons,
    "material": MaterialIcons,
    "fontawesome": FontAwesome,
    "evilicon": EvilIcons,
    "entypo": Entypo,
    "feather": Feather,
    "materialcommunityicons": MaterialCommunityIcons,
};

export function Icon({
    type = "ionicon",
    name = "help-outline",
    size = 24,
    color = "black",
}: {
    type?: string;
    name?: string;
    size?: number;
    color?: string;
}) {
    const IconComponent = iconLibraries[type];

    if (!IconComponent) {
        console.warn(`Icon type "${type}" not recognized, defaulting to "ionicon".`);
        return null;
    }

    return <IconComponent name={name} size={size} color={color} />;
}

/* --------------------------------------------------------------------------------------------------------------

    Last edited: 
        John Bicierro [Mar 17, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

-------------------------------------------------------------------------------------------------------------- */

import { View, Text, TouchableOpacity } from "react-native";
import NotificationIcon from "@/assets/images/notification.svg";

interface HeaderArr {
    name: string;
}

export function Header(props: HeaderArr) {
    return (
        <>
            {/* Top Navigation */}
            <View className="flex-row justify-between items-center">
                <Text className="font-lexend text-[24px] text-[#2B3854]">
                    {props.name}
                </Text>
                <View>
                    <TouchableOpacity>
                        <NotificationIcon width={32} height={32} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

/* --------------------------------------------------------------------------------------------------------------

    Last edited: 
        John Bicierro [Feb 22, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

-------------------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import { Tabs } from "expo-router";

import Colors from "../../constants/Colors";
import { useColorScheme } from "../../components/expo/useColorScheme";
import { useClientOnlyValue } from "../../components/expo/useClientOnlyValue";
import { Home, Plus, Search, User, WalletCards } from "lucide-react-native";
import { View } from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    tabBarIcon: () => (
                        <Home
                            color={
                                Colors[colorScheme ?? "light"].tabIconDefault
                            }
                            size={20}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="transaction"
                options={{
                    title: "Transaction",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Search
                            color={
                                Colors[colorScheme ?? "light"].tabIconDefault
                            }
                            size={20}
                        />
                    ),
                }}
            />

            {/* Add Transaction */}
            <Tabs.Screen
                name="addtransaction"
                options={{
                    title: "Add transaction",
                    tabBarLabel: () => {
                        return null;
                    },
                    headerShown: false,
                    tabBarIcon: () => (
                        <>
                            <View className="w-[40px] h-[40px] bg-[#E0F6FF] rounded-full flex items-center justify-center mt-4">
                                <Plus color={"#5FA7C6"} size={24} />
                            </View>
                        </>
                    ),
                }}
            />

            <Tabs.Screen
                name="budget"
                options={{
                    title: "Budget",
                    headerShown: false,
                    tabBarIcon: () => (
                        <WalletCards
                            color={
                                Colors[colorScheme ?? "light"].tabIconDefault
                            }
                            size={20}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: () => (
                        <User
                            color={
                                Colors[colorScheme ?? "light"].tabIconDefault
                            }
                            size={20}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

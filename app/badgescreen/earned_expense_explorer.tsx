/* --------------------------------------------------------------------------------------------------------------

    Last edited: 

        Miguel Armand B. Sta. Ana [May 11, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

    <Ticket Info>
    
    Feature Title: Expense Explorer Badge Screen
    Description: This is the Expense Explorer Badge Screen

-------------------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ExpenseExplorerSVG from "../../assets/bigbadges/big_expense_explorer.svg";
import Exit from "../../assets/bigbadges/exit.svg";
import Trophy from "../../assets/bigbadges/trophy.svg";
import Save from "../../assets/bigbadges/save.svg";
import Continue from "../../assets/bigbadges/continue.svg";
import { useNavigation } from "@react-navigation/native";
import { db } from "@/database";
import { user_tb } from "@/database/schema";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

type ExpenseExplorerProps = {
    userName?: string;
    onExit?: () => void;
};

const ExpenseExplorer: React.FC<ExpenseExplorerProps> = ({
    userName = "User",
    onExit,
}) => {
    const navigation = useNavigation();
    const handleExit = onExit || (() => navigation.goBack());

    // Ref for the badge area to capture
    const badgeRef = React.useRef<View>(null);

    // Save handler for capturing and saving the badge image
    const handleSave = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission required", "Please allow access to save images.");
                return;
            }
            const uri = await captureRef(badgeRef, {
                format: "png",
                quality: 1,
            });
            await MediaLibrary.saveToLibraryAsync(uri);
            Alert.alert("Saved!", "Badge image saved to your gallery.");
        } catch (err) {
            console.error("Error saving badge image:", err);
            Alert.alert("Error", "Failed to save image.");
        }
    };

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <View style={{ flex: 1, position: "relative" }}>
                <TouchableOpacity style={styles.exitIcon} onPress={handleExit}>
                    <Exit width={28} height={28} />
                </TouchableOpacity>
                {/* Only badge content is wrapped in ViewShot */}
                <ViewShot
                    ref={badgeRef}
                    options={{ format: "png", quality: 1 }}
                    style={{ flex: 1 }}
                >
                    <LinearGradient
                        colors={["#FBBC69", "#FBFBFB"]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.container}
                    >
                        <Trophy />
                        <Text
                            style={styles.congrats}
                        >{`Congrats, ${userName?.split(" ")[0] || "User"}!`}</Text>
                        <Text style={styles.unlocked}>You've Unlocked a Badge!</Text>
                        <ExpenseExplorerSVG />
                        <Text style={styles.title}>Expense Explorer</Text>
                        <Text style={styles.subtitle}>
                            You have spent money for the first time!
                        </Text>
                    </LinearGradient>
                </ViewShot>
                {/* Buttons are outside ViewShot, so not included in the image */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Save />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleExit} style={{ marginRight: -15 }}>
                        <Continue />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const EarnedExpenseExplorerScreen = (props: ExpenseExplorerProps) => {
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        async function fetchUserName() {
            try {
                const users = await db.select().from(user_tb);
                if (users.length > 0) {
                    setUserName(users[0].name || "User");
                }
            } catch (err) {
                console.error("Error fetching user name:", err);
            }
        }
        fetchUserName();
    }, []);

    return <ExpenseExplorer userName={userName} {...props} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
    },
    congrats: {
        fontFamily: "Lexend_600SemiBold",
        fontSize: 16,
        color: "#fff",
        marginBottom: 2,
        textAlign: "center",
    },
    unlocked: {
        fontFamily: "Lexend_400Regular",
        fontSize: 16,
        color: "#fff",
        marginBottom: 18,
        textAlign: "center",
    },
    title: {
        fontFamily: "Lexend_600SemiBold",
        fontSize: 24,
        color: "#fff",
        marginTop: 15,
        marginBottom: 19,
    },
    subtitle: {
        fontFamily: "Lexend_400Regular",
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
    exitIcon: {
        position: "absolute",
        top: 55,
        right: 30,
        zIndex: 10,
    },
    bottomButtons: {
        position: "absolute",
        bottom: 40,
        left: 2,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-end",
        paddingRight: 24,
    },
    saveButton: {
        marginRight: 16,
    },
});

export default EarnedExpenseExplorerScreen;

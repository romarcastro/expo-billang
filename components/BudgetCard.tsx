/* --------------------------------------------------------------------------------------------------------------

    Last edited:
        Miguel Armand B. Sta. Ana [May 20, 2025]
        Romar Castro [Mar 9, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

    <Ticket Info>
    Feature ID: BL-2
    Feature Title: Budget Screen
    Description:  This is the budget card component for the Budget Screen.

-------------------------------------------------------------------------------------------------------------- */

import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import SpentPercentageIcon from "@/assets/images/spentpercentageicon.svg";
import DefaultFolderSVG from "@/assets/budget-folders/default.svg";
import BlueFolderSVG from "@/assets/budget-folders/blue.svg";
import OrangeFolderSVG from "@/assets/budget-folders/orange.svg";
import RedFolderSVG from "@/assets/budget-folders/red.svg";
import GreenFolderSVG from "@/assets/budget-folders/green.svg";
import PinkFolderSVG from "@/assets/budget-folders/pink.svg";
import MonthlyDurationSVG from "@/assets/budget-folders/monthly_duration.svg";
import WeeklyDurationSVG from "@/assets/budget-folders/weekly_duration.svg";

export interface BudgetCardProps {
    name: string;
    amount: number;
    spent: string;
    percentage: number;
    themeColor?: string;
    contentColor?: string;
    duration?: "monthly" | "weekly";
}

// Map theme colors to their corresponding SVG components
const folderSVGMap: Record<string, React.FC<any>> = {
    "#E6E6E6": DefaultFolderSVG,
    "#87CDFF": BlueFolderSVG,
    "#FEC794": OrangeFolderSVG,
    "#FF8787": RedFolderSVG,
    "#9FE0A9": GreenFolderSVG,
    "#FADDFF": PinkFolderSVG,
};

const BudgetCard: React.FC<BudgetCardProps> = ({
    name,
    amount,
    spent,
    themeColor = "#E6E6E6",
    contentColor = "#F6F6F6",
    duration,
}) => {
    const spentNumber = parseFloat(spent.replace(/,/g, ""));
    let percentage = 0;
    if (amount > 0) {
        percentage = Math.min((spentNumber / amount) * 100, 100);
        percentage = Math.max(percentage, 0); // Prevent negative bar
    } else if (spentNumber > 0) {
        percentage = 100;
    }

    // Select the correct SVG based on the themeColor
    const FolderSVG = folderSVGMap[themeColor] || DefaultFolderSVG;

    return (
        <View style={[styles.budgetCard, { backgroundColor: themeColor }]}>
            <View
                style={[
                    styles.contentContainer,
                    { backgroundColor: contentColor, position: "relative" },
                ]}
            >
                {/* Background Layer: Folder image and overlay SVG */}
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                    }}
                >
                    <Image
                        source={require("@/assets/budget-folders/default.png")}
                        style={{
                            width: 320,
                            height: 160,
                            position: "absolute",
                            top: -30,
                            left: -20,
                        }}
                        resizeMode="cover"
                    />
                    {/* Use the selected SVG */}
                    <FolderSVG
                        width={400}
                        height={190}
                        style={{
                            position: "absolute",
                            top: -20,
                            left: -20,
                        }}
                    />
                </View>
                {/* Foreground Layer: All content */}
                <View style={{ zIndex: 1 }}>
                    <View style={styles.budgetHeader}>
                        <Text
                            style={[
                                styles.budgetName,
                                { fontFamily: "Lexend_500Medium" },
                            ]}
                        >
                            {name}
                        </Text>
                        {duration === "monthly" ? (
                            <MonthlyDurationSVG
                                width={20}
                                height={20}
                                style={{
                                    position: "absolute",
                                    top: 29,
                                    right: 2,
                                }}
                            />
                        ) : duration === "weekly" ? (
                            <WeeklyDurationSVG
                                width={16}
                                height={16}
                                style={{
                                    position: "absolute",
                                    top: 30,
                                    right: 3,
                                }}
                            />
                        ) : null}
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amount} numberOfLines={1}>
                            ₱{amount.toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                {
                                    width: `${percentage}%`,
                                    // Special case: pink folder gets a custom progress color
                                    backgroundColor:
                                        themeColor === "#E6E6E6"
                                            ? "#5FA7C6"
                                            : themeColor === "#FADDFF"
                                              ? "#E4A8C5"
                                              : themeColor,
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.budgetFooter}>
                        <Text style={styles.spentText}>
                            ₱{spentNumber.toLocaleString()} spent
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.percentageText}>
                                {percentage.toFixed(1)}%
                            </Text>
                            <SpentPercentageIcon
                                width={8}
                                height={8}
                                style={{ marginLeft: 5, marginRight: 7 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    budgetCard: {
        borderRadius: 14,
        overflow: "hidden",
        height: 150,
    },
    contentContainer: {
        padding: 12,
    },
    budgetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
        paddingLeft: 7,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    budgetName: {
        fontSize: 14,
        color: "#2B3854",
    },
    amountContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 3,
        marginBottom: 10,
        paddingLeft: 9,
    },
    currency: {
        fontSize: 22,
        color: "#2B3854",
        fontFamily: "Lexend_500Medium",
    },
    amount: {
        fontSize: 32,
        fontWeight: "300",
        color: "#2B3854",
        fontFamily: "Lexend_500Medium",
    },
    progressContainer: {
        backgroundColor: "#eaeaea",
        borderRadius: 99,
        height: 12,
        overflow: "hidden",
        marginBottom: 11,
    },
    progressBar: {
        height: "100%",
    },
    budgetFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    spentText: {
        fontSize: 13,
        fontWeight: "300",
        color: "#2B3854",
        fontFamily: "Lexend_500Medium",
    },
    percentageText: {
        fontSize: 13,
        fontWeight: "300",
        color: "#FE6B6B",
        fontFamily: "Lexend_500Medium",
    },
});

export default BudgetCard;

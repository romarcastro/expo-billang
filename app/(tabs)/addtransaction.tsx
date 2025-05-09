/* --------------------------------------------------------------------------------------------------------------

    Route -> "onboarding/ob.tsx"

    Last edited: 
        John Bicierro [Feb 22, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

    <Ticket Info>
    Feature ID: BL-1
    Feature Title: Onboarding Screen

-------------------------------------------------------------------------------------------------------------- */

import { db } from "@/database";
import { user_tb } from "@/database/schema";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Info,
    Paperclip,
    Pencil,
    PhilippinePeso,
    RotateCw,
    Save,
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { transactions_tb } from "@/database/schema";

// Transaction Images
import FoodIcon from "@/assets/transaction-icons/food.svg";
import TransitIcon from "@/assets/transaction-icons/transit.svg";
import GroceryIcon from "@/assets/transaction-icons/grocery.svg";
import BillsIcon from "@/assets/transaction-icons/bills.svg";
import EntertainmentIcon from "@/assets/transaction-icons/entertainment.svg";
import IncomeIcon from "@/assets/transaction-icons/income.svg";
import WorkIcon from "@/assets/transaction-icons/work.svg";
import SubscriptionIcon from "@/assets/transaction-icons/subscription.svg";
import { JSX } from "react/jsx-runtime";

export default function AddTransaction() {
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selected, setSelected] = useState<"expense" | "income">("expense");

    const inputRef = useRef<TextInput>(null); // Create the ref
    const [title, setTitle] = useState("");

    // Save budget
    async function SaveBudget() {
        // Set the onboarding to true
        await db.update(user_tb).set({ onboarding: true });

        // Save budget details
        // -- Budget name
        // -- Budget method type
        // -- First transaction (Amount)
        console.log(`[debug] amount: ${amount} | title: ${title}`);

        // Route home page
        router.replace("/");
        return;
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
            <View className="mx-[20px] h-screen flex">
                {/* Header */}
                <View className="mt-[30px] flex-row items-center justify-between">
                    <Text className="text-[#2B3854] font-lexend text-[24px]">
                        Add transaction
                    </Text>

                    <Pressable className="w-[32px] h-[32px] bg-[#F8F8F8] rounded-full items-center justify-center">
                        <Save color={"#8D8F9A"} size={20} />
                    </Pressable>
                </View>

                {/* Edit number */}
                <View className="items-center mt-[50px]">
                    <View className="flex-row items-center gap-1">
                        <Text className="font-lexend text-[20px]">₱</Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor="#3B3854"
                            className="font-lexend text-[32px]"
                            value={amount}
                            onChangeText={(text) => {
                                setAmount(text);
                            }}
                        />
                    </View>

                    <Text className="text-[12px] font-lexend text-gray-600">
                        Click me to edit
                    </Text>
                </View>

                <View className="flex-row mt-[50px] gap-[15px]">
                    <TouchableOpacity
                        onPress={() => setSelected("expense")}
                        className={`flex-grow items-center rounded-full py-2 ${
                            selected === "expense"
                                ? "bg-[#FD7474]"
                                : "bg-bgBorder-2"
                        }`}
                    >
                        <Text
                            className={`font-lexendMedium ${
                                selected === "expense"
                                    ? "text-white"
                                    : "text-[#BABABA]"
                            }`}
                        >
                            Expense
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelected("income")}
                        className={`flex-grow items-center rounded-full py-2 ${
                            selected === "income"
                                ? "bg-system-green"
                                : "bg-bgBorder-2"
                        }`}
                    >
                        <Text
                            className={`font-slexendMedium ${
                                selected === "income"
                                    ? "text-white"
                                    : "text-[#BABABA]"
                            }`}
                        >
                            Income
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Dynamic Content */}
                {selected === "expense" ? (
                    <ExpenseContent amount={amount} setAmount={setAmount} />
                ) : (
                    <IncomeContent />
                )}
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    );
}
function ExpenseContent({
    amount,
    setAmount,
}: {
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
}) {
    const categoryIcons = [
        { name: "Food", icon: <FoodIcon width={24} height={24} /> },
        { name: "Transit", icon: <TransitIcon width={24} height={24} /> },
        { name: "Grocery", icon: <GroceryIcon width={24} height={24} /> },
        { name: "Bills", icon: <BillsIcon width={24} height={24} /> },
        {
            name: "Entertainment",
            icon: <EntertainmentIcon width={24} height={24} />,
        },
        { name: "Income", icon: <IncomeIcon width={24} height={24} /> },
        { name: "Work", icon: <WorkIcon width={24} height={24} /> },
        {
            name: "Subscription",
            icon: <SubscriptionIcon width={24} height={24} />,
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categoryIcons[0]);
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    // const [date, setDate] = useState(new Date());
    // const [showDatePicker, setShowDatePicker] = useState(false);
    // const [showTimePicker, setShowTimePicker] = useState(false);

    // const handleDateChange = (_event: any, selected?: Date) => {
    //     const current = selected || date;
    //     setShowDatePicker(false);
    //     setDate(current);
    // };

    // const handleTimeChange = (_event: any, selected?: Date) => {
    //     const current = selected || date;
    //     setShowTimePicker(false);
    //     setDate(current);
    // };
    async function saveTransaction() {
        try {
            // Parse the amount and check if it's a valid number
            const numericAmount = parseFloat(amount);
            if (isNaN(numericAmount) || numericAmount <= 0) {
                console.error("[error] Invalid amount:", amount);
                return;
            }

            // Ensure title and category are not empty
            if (!title.trim()) {
                console.error("[error] Title is required");
                return;
            }

            if (!selectedCategory.name) {
                console.error("[error] Category is required");
                return;
            }

            // Save to the database
            await db.insert(transactions_tb).values([
                {
                    title: title.trim(),
                    notes: notes.trim(),
                    amount: numericAmount,
                    category: selectedCategory.name,
                },
            ]);

            // Clear form after saving
            setTitle("");
            setNotes("");
            setAmount("");
            setSelectedCategory(categoryIcons[0]);
            console.log("[debug] Transaction saved successfully!");
        } catch (err) {
            console.error("[error] Failed to save transaction:", err);
        }
    }

    return (
        <View className="flex-grow mt-[20px]">
            {/* Category Dropdown */}
            <View style={{ maxHeight: 60 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categoryIcons.map((item, index) => {
                        const isSelected = selectedCategory.name === item.name;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedCategory(item)}
                            >
                                <View
                                    className={`flex-row items-center gap-2 rounded-xl py-2 px-5 mr-2 ${
                                        isSelected
                                            ? "bg-[#FFDBDB]"
                                            : "bg-bgBorder-2"
                                    }`}
                                    style={{
                                        borderWidth: isSelected ? 1.5 : 0,
                                        borderColor: isSelected
                                            ? "#9D9D9D"
                                            : "transparent",
                                    }}
                                >
                                    {item.icon}
                                    <Text
                                        className={`font-lexend ${
                                            isSelected
                                                ? "text-[#FF5E5E] font-semibold"
                                                : "text-[#9D9D9D]"
                                        }`}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Date and Time Row */}
            {/* <View className="flex-row justify-between mt-4">
                <Pressable
                    className="flex-1 py-3 px-5 flex-row items-center gap-2 bg-bgBorder-2 rounded-xl mr-2"
                    // onPress={() => setShowDatePicker(true)}
                >
                    <Calendar color="#9D9D9D" size={12} />
                    <Text className="text-[#9D9D9D]">
                        {date.toLocaleDateString()}
                    </Text>
                </Pressable>
                <Pressable
                    className="flex-1 py-3 px-5 flex-row items-center gap-2 bg-bgBorder-2 rounded-xl ml-2"
                    // onPress={() => setShowTimePicker(true)}
                >
                    <Clock color="#9D9D9D" size={12} />
                    <Text className="text-[#9D9D9D]">
                        {date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                </Pressable>
            </View> */}

            {/* {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleDateChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleTimeChange}
                />
            )} */}

            {/* Title Input */}
            <View className="py-3 px-5 flex-row items-center gap-2 bg-bgBorder-2 rounded-xl mt-[20px]">
                <Text className="text-[#9D9D9D]">T</Text>
                <TextInput
                    placeholder="Title"
                    className="font-lexend flex-1"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            {/* Notes Input */}
            <View className="px-5 py-3 bg-bgBorder-2 rounded-xl mt-[20px] h-[120px] flex-row items-start gap-2">
                <Paperclip color="#9D9D9D" size={16} style={{ marginTop: 8 }} />
                <TextInput
                    placeholder="Notes"
                    className="font-lexend flex-1 text-base"
                    multiline
                    textAlignVertical="top"
                    value={notes}
                    onChangeText={setNotes}
                    maxLength={130}
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity
                className="mt-10 bg-primary py-3 rounded-lg flex items-center"
                onPress={saveTransaction}
            >
                <Text className="font-lexend text-white">Save Transaction</Text>
            </TouchableOpacity>
        </View>
    );
}
function IncomeContent() {
    return (
        <View className="flex-grow mt-[20px]">
            <View className="py-3 px-5 flex-row items-center gap-2 bg-bgBorder-2 rounded-xl">
                <RotateCw color="#9D9D9D" size={12} />
                <TextInput placeholder="Test" className="font-lexend" />
            </View>
        </View>
    );
}

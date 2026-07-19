import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "Messaging App",
                headerShown: false, // true Show headers by default
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Index",
                }}
            />
        </Stack>
    );
}

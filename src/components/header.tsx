import { Text, View } from "react-native";

type Props = {
    title: string
}

export function Header({title}: Props) {
    return (
        <View className="w-full h-28 items-row items-center justify-center bg-black/20 px-8 pb-4 border-b border-white/10">
            <Text className="flex-1 text-white font-medium text-lg text-center">{title}</Text>
        </View>
    )
}
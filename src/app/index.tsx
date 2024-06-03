import { Button } from "@/components/Button"
import { Input } from "@/components/input"
import { colors } from "@/styles/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, Redirect } from "expo-router"
import { useState } from "react"
import {View, Image, StatusBar,Text, Alert} from "react-native"
import {api} from "@/server/api"
import { useBadgeStore } from "@/store/badge-store"

export default function Home() {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const badgeStore = useBadgeStore()
    
    console.log("Dados =>", badgeStore.data)

    async function handleAccessCredential() {
        try {
            if(!code.trim()) {
                return Alert.alert("Ingresso", "Informe o código do ingresso!")
            }
            setIsLoading(true)

            const { data } = await api.get(`/attendees/${code}/badge`)
            console.log(data)
        }  catch(error) {
            console.log(error)
            setIsLoading(false)

            Alert.alert("Ingresso", "Ingresso não encontrado!")
        }    
    }

    if (badgeStore.data?.checkInURL) {
        return <Redirect href="/ticket"/>
    }

    return (
        <View className="flex-1 bg-green-500 justify-center items-center p-8">
           <StatusBar barStyle="light-content"/>
            <Image source={require("../assets/logo.png")} className="h-16" resizeMode="contain" />
          
            <View className="w-full mt-12 gap-3">
                <Input>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} color={colors.green[200]} />
                    <Input.Field placeholder="Código do ingresso" onChangeText={setCode}/>
                </Input>

                <Button title="Acessar credencial" onPress={handleAccessCredential} />
                <Link className="text-gray-100 text-base font-bold mt-8 text-center" href="/register ">Ainda não possui ingresso?</Link>
            </View>
        </View>
    )
}
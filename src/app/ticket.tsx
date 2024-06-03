import { Header } from "@/components/header";
import { Alert, Modal, Share, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Credential from "@/components/credential"
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import QRCode from "@/components/qrcode";
import { MotiView } from "moti";

import { Redirect } from "expo-router";

import { useBadgeStore } from "@/store/badge-store";

export default function Ticket(){
    
    const [image, setImage] = useState("")
    const [onShowQRCode, setOnShowQRCode] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleShare() {
        try {
            if(badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL,
                })
            }
        } catch(error) {
            console.log(error)
            Alert.alert("Compartilhar", "Não foi possível compartilhar.")
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,4],
            })

            if(result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri)
            }
          } catch (error){
             console.log(error)
             Alert.alert("Foto", "Não foi possível selecionar a imagem.")
        }
    }
    
    if (!badgeStore.data?.checkInURL) {
        return <Redirect href="/"/>
    }

    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content"/>
            <Header title="Minha credencial"/>
            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>
                <Credential 
                    data={badgeStore.data}
                    onChangeAvatar={handleSelectImage} 
                    onShowQRCode={() => setOnShowQRCode(true)}
                 />
                <MotiView 
                    from={{
                        translateY: 0,
                      }}
                      animate={{
                        translateY: 10,
                      }}
                      transition={{
                        loop: true,
                        type: "timing",
                        duration: 700,
                      }}
                >

                 <FontAwesome 
                    name="angle-double-down" 
                    color={colors.gray[300]} 
                    size={24} 
                    className="self-center my-6"
                />

                <Text className="text-white font-bold text-2xl mt-4">
                    compartilhar credencial
                </Text>

                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que voce vai participar do evento {badgeStore.data.eventTitle}!
                </Text>

                <Button title="Compartilhar" onPress={handleShare} />

                <TouchableOpacity activeOpacity={0.7} className="mt-10" onPress={() => badgeStore.remove()}>
                    <Text className="text-basse text-white font-bold text-center">Remover Ingresso</Text>
                </TouchableOpacity>
                </MotiView>
            </ScrollView>

                <Modal visible={true} statusBarTranslucent>
                    <View className="flex-1 bg-green-500 items-center justify-center">
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setOnShowQRCode(false)}>
                            <QRCode value="teste" size={300}/>
                            <Text className="text-body  text-orange-500 text-sm mt-10 text-center">
                                Fechar QRCode
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
        </View>
    )
}
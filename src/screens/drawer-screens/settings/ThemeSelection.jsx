

import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon, { Icons } from '../../../components/Icons';
import tw from "twrnc"
import RadioGroup from 'react-native-radio-buttons-group';
import useLoginStore from '../../../store/authentication/login.store';
import Languages from "../../../components/Languages.json"
import { languageSelectionTanslation } from './languageSelectionTanslation';

const ThemeSelection = ({ bottomSheetThemeSelectionRef, updateLanguage }) =>
{

    const { language, selectLanguage } = useLoginStore();
    const snapPoints = useMemo(() => ['35%', '50%', '70%'], []);
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const radioButtons = useMemo(() =>
    {
        return Languages.theme.map((l, i) => { 
            return ({ id: `${ i }`, label: l.option, value: l.option ,type:"theme"})})
    }, []);

    const [selectedId, setSelectedId] = useState();

    useEffect(() =>
    {
        if (language)
        {
            const index = Languages.languages.findIndex(l => l.lang == language)
            setSelectedId(`${ index }`)
        }
    }, [language])

    return (
        <BottomSheet
            ref={bottomSheetThemeSelectionRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
        >
            <View style={[tw`flex-1 items-center mx-5`]}>

                <View style={tw`flex-row items-center gap-2`}>
                    
                    <Icon type={Icons.Ionicons} name={"home"} size={28} color={"black"} />
                    <Text style={[tw`text-black text-[20px] text-center py-3`, { fontFamily: "Poppins-Bold" }]}>
                        {languageSelectionTanslation[language]["Select your Theme"]}
                    </Text>
                </View>

                <View style={tw`w-full justify-center items-center`}>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                        containerStyle={tw`items-start w-[30%]`}
                    />
                </View>
                <View style={tw`my-5 w-full items-center`}>
                    <Pressable
                        style={[tw`bg-[#171C1B] px-5 py-3 rounded-lg min-w-1/3 items-center`]}
                        onPress={() =>
                        {
                            selectLanguage(radioButtons[selectedId]?.value)
                            bottomSheetThemeSelectionRef.current.close()
                        }}>
                        <Text style={[tw`text-white text-xl`, { fontFamily: 'Poppins-SemiBold' }]}>
                            {languageSelectionTanslation[language]["Save"]}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </BottomSheet>
    )
}

export default ThemeSelection

const styles = StyleSheet.create({})




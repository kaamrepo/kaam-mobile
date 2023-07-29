

import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon, { Icons } from '../../../components/Icons';
import tw from "twrnc"
import RadioGroup from 'react-native-radio-buttons-group';
import useLoginStore, { retrieveLanguage } from '../../../store/authentication/login.store';


const LanguageSelection = ({ bottomSheetSelectLanguageRef, updateLanguage }) =>
{

    const snapPoints = useMemo(() => ['35%', '60%', '75%'], []);
    // const { retrieveLanguageFromStore } = useLoginStore();
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

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

    console.log({ selectedId: radioButtons[selectedId] })


    useEffect(() =>
    {
        // const lang = retrieveLanguageFromStore()
        const lang = retrieveLanguage()
        console.log(lang)
    }, [])
    return (
        <BottomSheet
            ref={bottomSheetSelectLanguageRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
        >
            <View style={[tw`flex-1 items-center mx-5`]}>

                <View style={tw`flex-row items-center gap-2`}>
                    <Icon type={Icons.Ionicons} name={"language"} size={28} color={"black"} />
                    <Text style={[tw`text-black text-[20px] text-center py-3`, { fontFamily: "Poppins-Bold" }]}>
                        Prefered Language
                    </Text>
                </View>

                <View>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                    />
                </View>
            </View>
        </BottomSheet>
    )
}

export default LanguageSelection

const styles = StyleSheet.create({})
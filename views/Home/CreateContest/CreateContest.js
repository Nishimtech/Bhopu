import React, { useState,useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Pressable, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { useResponsiveSizes } from 'react-native-responsive-sizes';
import { GradientView, HomeBackground, InputField } from '../../Components';
import styles from './styles';
import ListView from "deprecated-react-native-listview";
import { API, Constant, Core, Images, Toast, Utils } from '../../../Helper';
import Fonts from '../../../Helper/Fonts';
import Modal from "react-native-modal";
import AppPreferences from '../../../Preferences/AppPreferences';
import PreferenceConstant from '../../../Preferences/PreferenceConstant';
const CreateContest = ({ navigation, route }) => {
    const { leagueData,selected_sports,filterData,userBalance,userProfile,notificationCount } = route?.params
    const [selectIdxPrize, setSelectIdxPrize] = useState(0)
    const [createContest, setCreateContest] = useState({
        contestName: '',
        selectedGroup: {},
        selectedContestType: {},
        maxParticipants: '',
        entryFee: '',
        winners: '',
        ContestMode: {},
        multiEntry: '2',
        desc: ''
    })
    const [optionCreateContest, setOptionCreateContest] = useState({
        contestName: '',
        selectedGroup: {},
        selectedContestType: {},
        maxParticipants: '',
        entryFee: '',
        winners: '',
        ContestMode: {},
        multiEntry: '2',
        desc: ''
    })
    const responsive = useResponsiveSizes();
    const [createContestMasterData, setCreateContestMasterData] = useState([])
    const [prizeDistributionData, setPrizeDistributionData] = useState([])
    const [collectionData, setCollectionData] = useState([])
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
    const [selectDropdown, setSelectDropdown] = useState('')
    const [joinContestCode, setContestCode] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isMultiEntry, setIsMultiEntry] = useState(true)
    const [currentEditIndex, setcurrentEditIndex] = useState(-1)
    const [apiCalling, setApiCalling] = useState(false)

    const isValidation=()=>{
        if (createContest?.winners == 0 || createContest.desc == '' || createContest.ContestMode?.contest_mode_id == undefined || createContest.maxParticipants == 0 || createContest.contestName == '' || createContest.selectedGroup?.collection_id == undefined || createContest.selectedContestType?.group_id == undefined) {
            return false
        } 
        return true
    }
    const CHECK_ELIGIBILITY_FOR_CONTEST=()=>{
        setApiCalling(true)
        API.CHECK_ELIGIBILITY_FOR_CONTEST({"join_code":joinContestCode}).then(async (response) => {
            let result = response.data;
            if (result.response_code == Constant.SUCCESS_STATUS) {
                setContestCode("")
               navigation.navigate('LobbyDetail', { notificationCount, userBalance, userProfile, contestItem: result.data })
            }
        }).catch(error => {
            Utils.handleCatchError(error, navigation)
            return error;
        }).finally(() => {
            setApiCalling(false)
        });
    }
    const moveToPrivateContest = () => {
        if (createContest.contestName == '') {
            Toast.WarningShowToast('Contest name cannot be empty.')
            return
        } else if (createContest.selectedGroup?.collection_id == undefined) {
            Toast.WarningShowToast('Contest group cannot be empty.')
            return
        } else if (createContest.selectedContestType?.group_id == undefined) {
            Toast.WarningShowToast('Contest type cannot be empty.')
            return
        } else if (createContest.maxParticipants == 0) {
            Toast.WarningShowToast('Max participants cannot be empty.')
            return
        } else if (createContest.ContestMode?.contest_mode_id == undefined) {
            Toast.WarningShowToast('Contest mode cannot be empty.')
            return
        } else if (createContest.winners == 0) {
            Toast.WarningShowToast('Please add no. of winners')
            return
        } else if (createContest.desc == '') {
            Toast.WarningShowToast('Description cannot be empty.')
            return
        }
        setApiCalling(true)
        let prize_pool = 0
        prizeDistributionData?.map((item) => {
            prize_pool = prize_pool + parseFloat(item?.winning)
        })
       
        API.CREATE_USER_CONTEST({
            "sports_id": selected_sports.sports_id,
            "collection_id": createContest.selectedGroup?.collection_id,
            "contest_mode_id": createContest.ContestMode.contest_mode_id,
            "group_id": createContest.selectedContestType.group_id,
            "prize_type": "1",
            "prize_pool": prize_pool,
            "number_of_winners": createContest.winners == '' ? 1 : createContest.winners,
            "entry_fee": createContest.entryFee == '' ? 0 : createContest.entryFee,
            "size": createContest.maxParticipants,
            "prize_distribution_detail": prizeDistributionData == undefined ? [{ "min": 1, "max": 1, "prize_type": 1, "per": 100, "amount": "0", "min_value": "0", "max_value": "0" }] : prizeDistributionData,
            "game_name": createContest.contestName,
            "game_desc": createContest.desc,
            "multiple_lineup": createContest.multiEntry,
            "currency_type": 1
        }).then(async (response) => {
            let result = response.data;
            if (result.response_code == Constant.SUCCESS_STATUS) {
                navigation.navigate('PrivateContest', {
                    contestItem:result.data,
                    contest_id: result.data.contest_id,
                    prize_pool: result.data.prize_pool,
                    userBalance,userProfile,notificationCount
                })
            }
        }).catch(error => {
            Utils.handleCatchError(error, navigation)
            return error;
        }).finally(() => {
            setApiCalling(false)
        });
    }
    const calculateWinning = (percentValue, entryFee, minNo) => {
        let { site_rake, host_rake = 0 } = createContestMasterData
        let totalAmount = parseFloat(entryFee) * minNo;
        let totalRake = parseFloat(site_rake) + parseFloat(host_rake);
        let amountAfterSiteRake, winningAmt
        amountAfterSiteRake = totalAmount - ((totalAmount * totalRake) / 100);
        winningAmt = (amountAfterSiteRake * percentValue) / 100;
        return winningAmt;
    }
    const getPrizeDistributionData = (selectedPrizeData, entry_fee, maxParticipants = createContest.maxParticipants) => {
        if (selectedPrizeData && Array.isArray(selectedPrizeData)) {
            for (let i = 0; i < selectedPrizeData.length; i++) {
                let allItems = selectedPrizeData[i];
                let totalWinning = 0;
                for (let j = 0; j < allItems.length; j++) {
                    let winValue = calculateWinning(allItems[j].per, entry_fee, 2)
                    allItems[j].winning = winValue.toFixed(2);
                    allItems[j].prize_type = 1; // 1 for doller currency
                    allItems[j].min_value = winValue.toFixed(2)
                    allItems[j].max_value = winValue.toFixed(2)
                    totalWinning = totalWinning + winValue;
                }
                selectedPrizeData[i].totalWinning = totalWinning.toFixed(2);
            }
            return selectedPrizeData;
        }
        else if (selectedPrizeData) {
            let winValue = calculateWinning(selectedPrizeData.per, entry_fee, 2)
            selectedPrizeData.winning = winValue.toFixed(2);
            selectedPrizeData.prize_type = 1; // 1 for doller currency
            selectedPrizeData.totalWinning = winValue.toFixed(2);
            return selectedPrizeData;
        }
        else {
            return [];
        }
    }
   
    const OptionButton = ({ label, selected, onSelect, }) => {
        return (
            <TouchableOpacity onPress={onSelect}>
                <View style={styles.viewDaily(responsive)}>
                    <Text style={styles.txtDaily(responsive)}>{label}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={onSelect}
                            style={styles.touchSelect(responsive, selected)}>
                            {selected && <Image source={Images.IC_CORRECT} style={{ tintColor: Core.black, width: responsive.size(14) }} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const backAction = async () => {
        navigation.goBack()
    }
    const handleCrossPress = () => {
        setModalVisible(!modalVisible);
    };
    const getData = async (selectedGroup) => {
        await Promise.all([
            AppPreferences.getItem(PreferenceConstant.SPORTS_HUB_DATA),
        ]).then(async (dictObj) => {
            const data = JSON.parse(dictObj)
            if (data) {
                let set = true
                data?.game_type.map(item => {
                    if (set && item.status == 1) {
                        var newArray = selectedGroup.filter(function (el) {
                            return el.type == item.type_id;
                        });
                        setCreateContest({ ...createContest, selectedGroup: newArray[0] })
                        setOptionCreateContest({ ...createContest, selectedGroup: newArray[0] })
                        CREATE_CONTEST_MASTER_DATA(selected_sports.sports_id)
                        set = false
                    }
                })
            }
        })
    }
    useEffect(() => {
        COLLECTION_LIST()
    }, [])
    const handleDonePress = () => {
        setCreateContest({...optionCreateContest})
        if(selectDropdown == 'No.of Winners'){
            updatePriceDistribution(optionCreateContest.winners)
        }
        setModalVisible(false);
    };
    const updatePriceDistribution = (data, entryFee = createContest.entryFee, maxParticipants = createContest.maxParticipants) => {
        if (data == 1) {
            let win = calculateWinning(100, entryFee, 2)
            setPrizeDistributionData([{
                "min": 1,
                "max": 1,
                "per": 100,
                winning: win.toFixed(2),
                "min_value": win.toFixed(2),
                "max_value": win.toFixed(2)
            }])
        } else {
            if(createContestMasterData?.prize_distribution_data){
                let priceData = getPrizeDistributionData(createContestMasterData?.prize_distribution_data[data], entryFee, maxParticipants)
               setPrizeDistributionData(priceData[0])
            }
        }
    }
    const handleOptionSelect = async (data, type) => {
        switch (type) {
           case 'selectedGroup':
                setOptionCreateContest({ ...createContest, selectedGroup: data, selectedContestType: {} })
                break;
            case 'selectedContestType':
                if(data.group_name == 'H2H'){
                    setOptionCreateContest({ ...createContest, maxParticipants: "2",selectedContestType: data })
                    updatePriceDistribution(createContest.winners, createContest.entryFee, "2")
                }else{
                    setOptionCreateContest({ ...createContest, selectedContestType: data })
                }
                break;
            case 'ContestMode':
                setCreateContest({ ...createContest, ContestMode: data })
                break;
            case 'winners':
                setOptionCreateContest({ ...createContest, winners: data })
                break;
            case 'multiEntry':
                setOptionCreateContest({ ...createContest, multiEntry: data })
                break;
        }

    }
    const getWinPer = () => {
        let winPer = 0
        prizeDistributionData?.map((item) => {
            winPer = winPer + item?.per
        })
        return winPer
    }
    const togglePopup = (type) => {
        if (type == 'No.of Winners' && createContest.maxParticipants == 0) {
            Toast.WarningShowToast('Please enter maximum participants first.')
            return
        }
        if (type =='Select Groups'){
            var newArray = collectionData.filter(function (el) {
                return el.type == leagueData.type_id;
            });
            if(newArray.length == 0 ){
                Toast.WarningShowToast('No groups available for this contest window.')
                return
            }  
        }
        setSelectDropdown(type)
        setModalVisible(!modalVisible);
    };
   
    const COLLECTION_LIST = () => {
        API.COLLECTION_LIST({sports_id:selected_sports.sports_id}).then(async (response) => {
            let result = response.data;
            if (result.response_code == Constant.SUCCESS_STATUS) {
                setCollectionData(result.data)
                getData(result.data)

            }
        }).catch(error => {
            Utils.handleCatchError(error, navigation)
            return error;
        });
    }
    const CREATE_CONTEST_MASTER_DATA = (sports_id) => {
        API.CREATE_CONTEST_MASTER_DATA({ sports_id: sports_id }).then(async (response) => {
            let result = response.data;
            if (result.response_code == Constant.SUCCESS_STATUS) {
                setCreateContestMasterData(result.data)
            }
        }).catch(error => {
            Utils.handleCatchError(error, navigation)
            return error;
        });
    }
    const renderJoin = () => {
        return (
            <View style={{ flex: 1, marginTop: responsive.size(20) }}>

                <Text style={styles.txtHeaderCode(responsive)}>Enter the contest code to join</Text>

                <View style={styles.viewContestCode(responsive)}>
                    <Image source={Images.blurTopLeft} defaultSource={Images.blurTopLeft} style={styles.imgBlurLeft} />

                    <View style={styles.viewList(responsive)}>
                        <InputField
                        onChangeText={value => setContestCode(value)}
                        createContest={true}
                        type={'contest_code'}
                        value={joinContestCode}
                        label={'Contest Code'}
                        img_name={Images.JOIN}
                        label_name={'Contest Code'}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={CHECK_ELIGIBILITY_FOR_CONTEST} disabled={apiCalling || joinContestCode==''} style={styles.btnTouchJoin(responsive,joinContestCode=='',apiCalling)}>
                    {
                        apiCalling ?
                            <ActivityIndicator color={'black'} />
                        :
                        <Text style={styles.txtBtnJoin(responsive)}>Join</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
    const editPrizeDistributionData = (value, index) => {
        let temp = prizeDistributionData
        temp[index].per = parseFloat(value)
        setPrizeDistributionData(temp)
    }
    const editModeFunc = () => {
        const totelPer = getWinPer()
        if (totelPer <= 100) {
            setcurrentEditIndex(-1)
            setIsEditMode(isEditMode => !isEditMode)
        } else {
            Toast.WarningShowToast('Winning % cannot be greater then 100%')
        }
    }
    const userDataWithCallback = useCallback((item, index) => {

        return (<View key={item.per} style={styles.viewInner(responsive)}>
            <Text style={styles.txtRank(responsive)}>{item.max}</Text>
            <View style={styles.viewWinning(responsive, isEditMode)}>
                <TextInput
                    editable={isEditMode}
                    placeholder='Enter'
                    maxLength={3}
                    placeholderTextColor={Core.silver}
                    defaultValue={currentEditIndex == index ? "" : String(item.per)}
                    onFocus={() => { setcurrentEditIndex(index) }}
                    onChangeText={(value) => { editPrizeDistributionData(value, index) }}
                    style={styles.txtRankInput(responsive)}
                />
            </View>
            <Text style={styles.txtRank(responsive)}>${item.winning}</Text>
        </View>)
    }, [isEditMode, prizeDistributionData])
    const userDataWithCallback1 = useCallback(() => {
        return prizeDistributionData?.map((item, index) => userDataWithCallback(item, index))
    }, [prizeDistributionData, isEditMode])
    const renderModal=()=>{
        const numberOfWinner = createContest.maxParticipants > 10 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, createContest.maxParticipants)
        return(
            <Modal
            transparent={true}
            isVisible={modalVisible}
            onRequestClose={() => togglePopup()}
            onBackdropPress={() => togglePopup()}
            onBackButtonPress={() => togglePopup()}
            style={{ margin: 0}}
        >
            <SafeAreaView style={{ flex: 1,justifyContent:'flex-end'}}>
                <View style={styles.viewPopUp(responsive)}>
                <View style={styles.behindContainer}>
                        <Image source={Images.blurTopRight} defaultSource={Images.blurTopRight} style={styles.rightTop(responsive)} />
                        <Image source={Images.bottomLeft} defaultSource={Images.bottomLeft} style={styles.bottonLeft(responsive)} />
                    </View>
                    <View style={styles.viewContestWndw(responsive)}>
                        <View style={{width:'15%',alignItems:'flex-start',justifyContent:'center'}}>
                            <TouchableOpacity onPress={handleCrossPress}>
                                <Image source={Images.CROSS} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.txtContstWndow(responsive)}>{selectDropdown}</Text>
                        <TouchableOpacity style={styles.btnDone(responsive)} onPress={handleDonePress}>
                            <Text style={styles.btnTxt(responsive)}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{flex:1,paddingBottom:responsive.size(80)}} showsVerticalScrollIndicator={false}>
                   
                   

                    {selectDropdown == 'Contest Type' && filterData?.contest_type?.length > 0 && <>
                        {filterData?.contest_type.map((item) =>
                            createContest?.selectedGroup?.type == item.type && <OptionButton key={item.group_name} label={item.group_name} selected={optionCreateContest.selectedContestType?.group_name === item.group_name} onSelect={() => handleOptionSelect(item, "selectedContestType")} />
                        )}
                    </>}
                    {selectDropdown == 'Select Groups' && collectionData.length > 0 && <>
                        {collectionData.map((item) => { return leagueData.type_id == item.type && <OptionButton key={item.name} label={item.name} selected={optionCreateContest.selectedGroup?.name === item.name} onSelect={() => handleOptionSelect(item, "selectedGroup")} /> }
                        )}
                    </>}
                    {selectDropdown == 'No.of Winners' && <>
                        {numberOfWinner.map((item) =>
                            <OptionButton key={item}  label={item} selected={optionCreateContest.winners == item} onSelect={() => handleOptionSelect(item, "winners")} />
                        )}
                    </>}
                    {selectDropdown == 'Multi Entry' && <>
                        {[2, 3, 4, 5].map((item) =>
                            <OptionButton key={item} label={item} selected={optionCreateContest.multiEntry == item} onSelect={() => handleOptionSelect(item, "multiEntry")} />
                        )}
                    </>}
                    </ScrollView>
                </View>
            </SafeAreaView>

        </Modal>
        )
    }
    const renderContest = () => {
        const totelPer = getWinPer()
        return (
            <View>
                {renderModal()}
                <View style={styles.listContainer(responsive)}>
                    <View style={styles.viewList(responsive)}>
                        <InputField
                        createContest={true}
                        type={'sports_name'}
                        editable={false}
                        value={selected_sports?.sports_name}
                        label={'Select Sport'}
                        img_name={Images.BOOK}
                        label_name={'Select Sports'}
                        />
                    </View>
                    <View style={styles.viewList(responsive)}>
                        <InputField
                        createContest={true}
                        type={'contest_window'}
                        editable={false}
                        value={leagueData?.name}
                        label={'Contest Window'}
                        img_name={Images.CALCULATOR}
                        label_name={'Contest Window'}
                        />
                    </View>

                    <View style={styles.viewList(responsive)}>
                        <InputField
                            createContest={true}
                            info_icon={true}
                            onChangeText={value => setCreateContest({ ...createContest, contestName: value })}
                            type={'contest_name'}
                            value={createContest.contestName}
                            label={'Contest Name'}
                            maxLength={25}
                            img_name={Images.IC_TROPHY}
                            label_name={'Type here ...'}
                        />
                    </View>
                    <Text style={styles.txtBottomValidation(responsive)}>{createContest?.contestName ? createContest?.contestName?.length : 0}/25 characters left</Text>
                  
                    <View style={styles.viewList(responsive)}>
                        <InputField
                        createContest={true}
                        drop_down={true}
                        clickOnAction={()=>togglePopup('Select Groups')}
                        type={'select_groups'}
                        editable={false}
                        value={createContest?.selectedGroup?.name}
                        label={'Select Groups'}
                        img_name={Images.BOOK}
                        label_name={'Select Groups'}
                        />
                    </View>

                    <View style={styles.viewList(responsive)}>
                        <InputField
                        createContest={true}
                        drop_down={true}
                        clickOnAction={()=>togglePopup('Contest Type')}
                        type={'contest_type'}
                        editable={false}
                        value={createContest?.selectedContestType?.group_name}
                        label={'Contest Type'}
                        img_name={Images.BOOK}
                        label_name={'Contest Type'}
                        />
                    </View>

                    <View style={styles.viewList(responsive)}>
                        <InputField
                            createContest={true}
                            onChangeText={value => {
                                let max_participation = value==""?"":parseInt(value) < parseInt(filterData.contest_filter.max_participation)?value:filterData.contest_filter.max_participation;
                                setCreateContest({ ...createContest, maxParticipants: max_participation})
                                updatePriceDistribution(createContest.winners, createContest.entryFee, max_participation)
                            }}
                            type={'maximum_participants'}
                            value={createContest.maxParticipants}
                            label={'Maximum Participants'}
                            img_name={Images.USER}
                            editable={createContest?.selectedContestType?.group_name != "H2H"}
                            keyboardType='number-pad'
                            label_name={'Type here ...'}
                        />
                    </View>

                    <View style={styles.viewList(responsive)}>
                        <InputField
                            createContest={true}
                            info_icon={true}
                            onChangeText={value => {
                                let max_entry_fee = value==""?"":parseInt(value) < parseInt(filterData.contest_filter.max_entry_fee)?value:filterData.contest_filter.max_entry_fee;
                                setCreateContest({ ...createContest, entryFee: max_entry_fee })
                                updatePriceDistribution(createContest.winners, max_entry_fee)
                            }}
                            type={'entry_fee'}
                            value={createContest.entryFee}
                            label={'Entry Fee($)'}
                            img_name={Images.BOOK}
                            keyboardType='number-pad'
                            label_name={'Type here ...'}
                        />
                    </View>
                    <Text style={[styles.txtBottomValidation(responsive),{marginBottom:responsive.size(10)}]}>Enter zero to make a free contest</Text>
                  
                    {createContest.entryFee > 0 && 
                        <View style={[styles.viewList(responsive),{marginBottom:responsive.size(20)}]}>
                            <InputField
                            createContest={true}
                            drop_down={true}
                            clickOnAction={()=>togglePopup('No.of Winners')}
                            type={'no_of_winners'}
                            editable={false}
                            value={String(createContest.winners)}
                            label={'No.of Winners'}
                            img_name={Images.BOOK}
                            label_name={'No.of Winners'}
                            />
                        </View>
                   }
                </View>
                {createContest?.winners > 0 && (
                    <View style={{ marginBottom: responsive.size(15) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: Core.primaryColor, fontSize: responsive.size(Fonts.xxl), fontFamily: Fonts.medium, marginLeft: responsive.size(20) }}>Winning Distribution</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <GradientView colors={[Core.trout, 'rgba(85, 91, 100, 0.33)']} styles={styles.viewNum(responsive)}>
                                    <Text style={styles.txtNum(responsive)}>{totelPer}%</Text>
                                </GradientView>
                                <TouchableOpacity style={styles.viewDone(responsive)} onPress={() => editModeFunc()}>
                                    <Text style={styles.txtDone(responsive)}>{isEditMode ? 'Done' : 'Edit'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewOuter(responsive, createContest.winners)}>
                            <Image source={Images.blurTopLeft} defaultSource={Images.blurTopLeft} style={styles.imageBlurLeft} />

                            <View style={styles.viewInnerItm(responsive)}>
                                <Text style={styles.txtSubHeader(responsive)}>Rank</Text>
                                <Text style={styles.txtSubHeader(responsive)}>Winning%</Text>
                                <Text style={styles.txtSubHeader(responsive)}>Winning</Text>
                            </View>
                            {
                                userDataWithCallback1()
                            }
                        </View>
                    </View>
                )}
            </View>


            // </View>
        )
    }
    const renderFooter = () => {
        return (
            <View>
                <Text style={styles.txtContestMode(responsive)}>Contest Mode</Text>
                <View style={styles.viewBtnPick(responsive)}>
                    {filterData?.contest_mode?.map(item => {
                        return <TouchableOpacity onPress={() => handleOptionSelect(item, 'ContestMode')} style={styles.btnPick(responsive, item?.contest_mode_id == createContest.ContestMode?.contest_mode_id)}>
                            <Text style={styles.txtPick(responsive)}>{item.name}</Text>
                        </TouchableOpacity>
                    })}
                </View>
                <View style={styles.viewEntry(responsive)}>
                    <View style={{ flex: 7 }}>
                        <Text style={styles.txtHdrEntry(responsive)}>Multi Entry</Text>
                        <Text style={styles.txtTeam(responsive)}>User can join using multiple teams</Text>
                    </View>
                    <Pressable disabled={!isMultiEntry} onPress={() => { togglePopup('Multi Entry') }} style={styles.viewLabel(responsive)}>
                        <Text style={styles.txtMax(responsive)}>{createContest.multiEntry > 1 ? `Max ${createContest.multiEntry}` : 'Single Entry'}</Text>
                        {createContest.multiEntry != 1 && <Image source={Images.DROPDOWN} />}
                    </Pressable>
                </View>

                <View style={styles.viewBtn(responsive)}>
                    <TouchableOpacity disabled={isMultiEntry} style={styles.btnYes(responsive, isMultiEntry)} onPress={() => { setIsMultiEntry(true), setCreateContest({ ...createContest, multiEntry: 2 }) }}>
                       {
                        isMultiEntry?
                        <GradientView styles={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                                <Text style={styles.txtBtnYes(responsive, isMultiEntry)}>Yes</Text>
                        </GradientView>
                        :
                        <Text style={styles.txtBtnYes(responsive, isMultiEntry)}>Yes</Text>
                       }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnYes(responsive, !isMultiEntry)} onPress={() => { setIsMultiEntry(false), setCreateContest({ ...createContest, multiEntry: 1 }) }}>
                        {
                            !isMultiEntry?
                            <GradientView styles={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={styles.txtBtnYes(responsive, !isMultiEntry)}>No</Text>
                            </GradientView>
                            :
                            <Text style={styles.txtBtnYes(responsive, !isMultiEntry)}>No</Text>
                        }
                    </TouchableOpacity>
                </View>
                <Text style={styles.txtHdrDesc(responsive)}>Description</Text>
                <View style={styles.viewDescOuter(responsive)}>
                    <Image style={styles.imgLeftView} source={Images.blurTopLeft} defaultSource={Images.blurTopLeft} />
                    <View style={styles.viewInnrItm(responsive)}>
                        <Image source={Images.NOTE} />
                        <Text style={styles.txtDesc(responsive)}>Write Description</Text>
                    </View>
                    <View style={styles.viewTxtInput(responsive)}>
                        <TextInput
                            placeholder="Type here..."
                            maxLength={200}
                            multiline
                            placeholderTextColor="white"
                            value={createContest.desc}
                            onChangeText={value => setCreateContest({ ...createContest, desc: value })}
                            style={styles.input(responsive)} />
                    </View>
                    <Text style={styles.txtWarning(responsive)}>{createContest?.desc?.length}/200 characters left</Text>
                </View>
                <Text style={styles.txtCondition(responsive)}>The total prize pool and your earnings for hosting the private contest may change based on the actual number of teams joining the contest</Text>
             
                <TouchableOpacity onPress={moveToPrivateContest} style={styles.btnShareTouch(responsive,apiCalling,isValidation)}>
                    {apiCalling ? <ActivityIndicator size={'small'} color={Core.black} /> : <Text style={styles.buttonText(responsive)}>Create & Share</Text>}
                </TouchableOpacity>

            </View>


        )
    }
    return (
        <HomeBackground title={'Create or Join Contest'} backAction={backAction}  isLeftIcon={true} isBack={true} >
            <View style={styles.wrapper}>
                <View style={styles.viewCreateContest(responsive)}>
                    <TouchableOpacity disabled={apiCalling} onPress={() => setSelectIdxPrize(0)} style={styles.btnCreate(responsive, selectIdxPrize)}>
                        <Text style={styles.txtCreate(selectIdxPrize, responsive)}>Create Contest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={apiCalling} onPress={() => setSelectIdxPrize(1)} style={styles.btnJoin(responsive, selectIdxPrize)}>
                        <Text style={styles.txtJoin(selectIdxPrize, responsive)}>Join Contest</Text>
                    </TouchableOpacity>
                </View>
                {
                    selectIdxPrize == 0 &&
                    <ListView
                        key={"CreateContest"}
                        keyboardShouldPersistTaps='handled'
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        style={styles.wrapper}
                        dataSource={ds.cloneWithRows([])}
                        renderHeader={selectIdxPrize === 0 ? renderContest : renderJoin}
                        renderFooter={renderFooter}
                        removeClippedSubviews={!(Platform.OS == "ios")}
                    />
                }
                {
                    selectIdxPrize === 1 && renderJoin()
                }

            </View>
        </HomeBackground>
    )
};
export default CreateContest;

import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useResponsiveSizes } from "react-native-responsive-sizes";
import { Core, Images } from "../../Home";
import { Toast } from "../../../Helper";

const TagInput = ({ data, placeholder }) => {
    const responsive = useResponsiveSizes();
    const [tags, setTags] = useState([]); // state array for storing tags
    const [input, setInput] = useState(""); // state for input text
    const [filteredData, setFilteredData] = useState([]); // state for filtered data
    const [currentHeight, setCurrentHeight] = useState(0)
    // function to handle input change
    const handleChange = (text) => {
        setInput(text);
        // filter the data based on input text
        const filtered = data.filter((item) => item?.user_name?.toLowerCase()?.includes(text?.toLowerCase()));
        alert(filtered.length)
        setFilteredData(filtered);
    };

    const addTag = (tag) => {
        let isNew = true
        tags.map(item => {
            if (item.email == tag.email) {
                isNew = false
            }
        })
        if (isNew) {
            setTags([...tags, tag]);
            setInput("");
            setFilteredData([]);
        } else {
            Toast.WarningShowToast('Already Added')
        }
    };

    // function to remove a tag
    const removeTag = (tag) => {
        // filter out the tag from tags array
        const updatedTags = tags.filter((item) => item.email != tag.email);
        setTags(updatedTags);
    };

    const renderTagItem = (item) => {
        return (
            <View key={item.user_id} style={styles.viewTag(responsive)}>
                <Text style={styles.txtTag(responsive)}>{item.user_name}</Text>
                <TouchableOpacity onPress={() => removeTag(item)}>
                    <Image source={Images.CROSS} defaultSource={Images.CROSS} style={styles.imgCross(responsive)} />
                </TouchableOpacity>
            </View>
        );
    };

    const renderDataItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => addTag(item)}>
                <Text style={styles.txtUsername(responsive)}>{item.user_name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, height: 'auto' }} >
            <View>

                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }} >
                    {tags.map(item => renderTagItem(item))}
                </View>

                <View style={styles.viewInput(responsive)}>
                    <TextInput
                        style={styles.txtInputBox(responsive)}
                        value={input}
                        onChangeText={handleChange}
                        placeholder={placeholder}
                    />
                    <TouchableOpacity onPress={() => addTag(input)} style={styles.btnAdd(responsive)}>
                        <Text style={styles.txtAddBtn(responsive)}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ width: '100%', height: input.length > 0 && filteredData.length > 0 ? responsive.size(100):0, zIndex: 10, borderRadius: responsive.size(8), overflow: 'hidden',padding:2 }}>
                {filteredData.length > 0 && input.length > 0 && <View>
                    <FlatList
                        data={filteredData}
                        renderItem={renderDataItem}
                        keyExtractor={(item) => item.email}
                        ItemSeparatorComponent={() => <View style={{ backgroundColor: Core.gold_tips, width: '100%', height: responsive.size(1) }} />}
                        style={{ backgroundColor: Core.tuna_color }}
                    />
                </View>}
            </View>
        </View>
    );
};

export default TagInput;

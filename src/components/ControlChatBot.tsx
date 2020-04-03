import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    ViewProps,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    ScrollView,
    Linking,
    SafeAreaView,
} from "react-native";

import { Styles, Helpers } from "../commons";
import ControlHeader from "./ControlHeader";
import ControlCircle from "./ControlCircle";
import { ControlText } from ".";
import { Constants, Strings } from "../constants";
import feathers from "@feathersjs/client";
import io from "socket.io-client";
import { TagSelect } from "react-native-tag-select";

export interface IProps extends ViewProps {
    title?: string;
    navigation?: any;
    botAvatar?: any;
    myAvatar?: any;
    apiKey?: string;
    tags?: ITag[];
    userName: string;
    initMessage?: string;
    rightIcon?: any;
    rightIconStyle?: any;
    resizeMode?: any;
    onRightButtonPress?: any;
    isShowRightButton?: boolean;
    bodyColor?: string;
    headerColor?: string;
    sendMessageColor?: string;
    receiveMessageColor?: string;
    tagColor?: string;
    tagSelectedColor?: string;
    tagLabelSelectedColor?: string;
    messageBoxColor?: string;
    licenseKey?: string;
    language: "vi" | "en";
}

interface IStateProps extends ViewProps {
    messageList?: IMessage[];
    navigation?: any;
    currentContent: string;
}

interface IMessage {
    channelId: string;
    threadId: string;
    senderId: string;
    messageType: number;
    message: string;
    avatar?: string;
    isChatbot?: number;
}

interface ITag {
    id: string;
    label: string;
}

export default class ControlChatBot extends PureComponent<IProps, IStateProps> {
    public client: any = feathers();
    private socket: any = io(Constants.Api.BASE_URL, {
        transports: ['websocket']
    });
    private visitor: any;
    private ref: any | null;
    constructor(props: any) {
        super(props);
        this.client.configure(feathers.socketio(this.socket));
        this.client.configure(feathers.authentication({
            storage: AsyncStorage as any
        }));
        // Listen to created events and add the new message in real-time
        this.client.service("messages").on("created", this.loadMessages);
        if (Strings) {
            Strings.setLanguage(this.props.language || "en");
        }
        this.state = {
            messageList: [],
            currentContent: "",
        }
    }

    public async componentDidMount() {
        try {
            this.visitor = await this.client.authenticate({
                strategy: "api-key",
                apiKey: this.props.apiKey,
                visitorName: this.props.userName,
            });
        } catch (error) {
            console.log(error);
            this.props.navigation.goBack();
        }
    }

    public loadMessages = async (message: any) => {
        try {
            let messageList: IMessage[] = this.state.messageList || [];
            // The user that sent this message (added by the populate-user hook)
            const { user = {} } = message;
            // Escape HTML to prevent XSS attacks
            const text = message.message
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;").replace(/>/g, "&gt;");
            let msg = message;
            msg.message = text;
            msg.avatar = user.avatarUrl;
            messageList.push(msg);
            this.setState({
                messageList: [...messageList]
            });
        } catch (error) {
            console.error(error);
        }
    };

    public onSend = async (message?: string) => {
        try {
            if (Helpers.isNullOrEmpty(this.state.currentContent) && Helpers.isNullOrEmpty(message)) {
                return;
            }
            // Create a new message and then clear the input field
            await this.client.service("messages").create({
                channelId: this.visitor.channelId,
                threadId: this.visitor.threadId,
                senderId: this.visitor.visitorId,
                messageType: 1,
                message: (Helpers.isString(message) && message) ? message : this.state.currentContent
            });
            this.setState({ currentContent: "" });
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        const list = this.state.messageList || [];
        const headerColor = this.props.headerColor || "#ADD8E6";
        const bodyColor = this.props.bodyColor || "#ffffff";
        const sendMessageColor = this.props.licenseKey ? (this.props.sendMessageColor || "#ADD8E6") : "#ADD8E6";
        const receiveMessageColor = this.props.licenseKey ? (this.props.receiveMessageColor || "#F2F2F2") : "#F2F2F2";
        const tagColor = this.props.licenseKey ? (this.props.tagColor || "#F2F2F2") : "#F2F2F2";
        const tagSelectedColor = this.props.licenseKey ? (this.props.tagSelectedColor || "#333") : "#333";
        const tagLabelSelectedColor = this.props.licenseKey ? (this.props.tagLabelSelectedColor || "#ffffff") : "#ffffff";
        const messageBoxColor = this.props.licenseKey ? (this.props.messageBoxColor || "#F2F2F2") : "#F2F2F2";
        const botAvatar = this.props.botAvatar;
        const myAvatar = this.props.myAvatar || require("../assets/images/default_avatar.png");
        return (
            <View style={Styles.fullSize}>
                <SafeAreaView style={Styles.appContainer}>
                    <ControlHeader
                        style={{ backgroundColor: headerColor }}
                        title={this.props.title}
                        navigation={this.props.navigation}
                        isShowRightButton={this.props.isShowRightButton}
                        rightIcon={this.props.rightIcon}
                        onBackPress={this.props.navigation.goBack}
                        onRightButtonPress={this.props.onRightButtonPress} />
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={10}
                        style={Styles.appContainer}>
                        <View style={[Styles.appContainer, localStyles.p16, { backgroundColor: bodyColor }]}>
                            <ScrollView
                                style={[{ flex: 0.77 }]}
                                ref={(ref: any) => { this.ref = ref; }}
                                onContentSizeChange={() => {
                                    this.ref.scrollToEnd({ animated: true });
                                }}>
                                <View style={Styles.appContainer}>
                                    {
                                        (!list || list.length === 0)
                                        &&
                                        <View style={[Styles.vertical]}>
                                            <View
                                                style={[Styles.horizontal]}>
                                                {
                                                    Helpers.isString(botAvatar) ?
                                                        <ControlCircle size={30}
                                                            source={{ uri: botAvatar }} />
                                                        :
                                                        <ControlCircle size={30}
                                                            source={botAvatar} />
                                                }
                                                <View style={[
                                                    Styles.form, Styles.ml16,
                                                    {
                                                        backgroundColor: receiveMessageColor,
                                                        maxWidth: Constants.SCREEN_WIDTH - 16 - 24 - 16 - 16
                                                    }]}>
                                                    <ControlText>{this.props.initMessage}</ControlText>
                                                </View>
                                            </View>
                                            <View style={Styles.mt16}>
                                                <TagSelect
                                                    data={this.props.tags}
                                                    itemStyle={[localStyles.item, { backgroundColor: tagColor }]}
                                                    itemLabelStyle={Styles.textDefault}
                                                    itemStyleSelected={{ backgroundColor: tagSelectedColor }}
                                                    itemLabelStyleSelected={{ backgroundColor: tagLabelSelectedColor }}
                                                    onItemPress={(item: any) => {
                                                        this.onSend(item.label);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    }
                                    {
                                        list.map((item: IMessage, index) => {
                                            if (item.isChatbot === 1 || item.senderId !== this.visitor.visitorId) {
                                                let uri = item.isChatbot === 1 ? this.props.botAvatar : item.avatar;
                                                uri = !uri ? this.props.botAvatar : uri;
                                                return (
                                                    <View key={index}
                                                        style={[Styles.horizontal, index > 0 ? Styles.mt25 : {}, Styles.alignEnd]}>
                                                        {
                                                            Helpers.isString(uri) ?
                                                                <ControlCircle size={30}
                                                                    source={{ uri }} />
                                                                :
                                                                <ControlCircle size={30}
                                                                    source={uri} />
                                                        }
                                                        <View style={[
                                                            Styles.form, Styles.ml16,
                                                            {
                                                                backgroundColor: receiveMessageColor,
                                                                maxWidth: Constants.SCREEN_WIDTH - 16 - 24 - 16 - 16
                                                            }]}>
                                                            <ControlText>{item.message}</ControlText>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            return (
                                                <View key={index}
                                                    style={[Styles.w100pc, Styles.alignEnd, index > 0 ? Styles.mt25 : {}]}>
                                                    <View style={[Styles.horizontal, Styles.alignEnd]}>
                                                        <View style={[Styles.form, Styles.mr16, { backgroundColor: sendMessageColor, maxWidth: Constants.SCREEN_WIDTH - 16 - 24 - 16 - 16 }]}>
                                                            <ControlText>
                                                                {item.message}
                                                            </ControlText>
                                                        </View>
                                                        {
                                                            Helpers.isString(myAvatar) ?
                                                                <ControlCircle size={30}
                                                                    source={{ uri: myAvatar }} />
                                                                :
                                                                <ControlCircle size={30}
                                                                    source={myAvatar} />
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                            <View
                                style={[{
                                    flex: 0.23,
                                }]}>
                                <TouchableOpacity onPress={() => Linking.openURL("http://maysoft.io/")}>
                                    <ControlText
                                        style={[Styles.text, Styles.textCenter, Styles.mb10, { color: bodyColor !== "#ffffff" ? messageBoxColor : "#333" }]}>
                                        {"Power by maysoft.io"}
                                    </ControlText>
                                </TouchableOpacity>
                                <View style={[
                                    Styles.horizontal,
                                    Styles.justifyEnd,
                                    {
                                        backgroundColor: messageBoxColor,
                                        borderRadius: 76 / 2,
                                        justifyContent: "space-between",
                                        padding: 8,
                                    }, Styles.alignCenter]}>
                                    <TextInput
                                        autoFocus
                                        autoCorrect={false}
                                        multiline={false}
                                        style={[{ flex: 0.85 }, Styles.textBoldDefault, Styles.mr16]}
                                        placeholder={(Strings && Strings.ChatBot.INPUT_MESSAGE) || "Input message..."}
                                        value={this.state.currentContent}
                                        onChangeText={(currentContent: string) => {
                                            this.setState({ currentContent });
                                        }}
                                    />
                                    <TouchableOpacity style={[Styles.w10pc, Styles.mr16, { flex: 0.15 }]}
                                        onPress={() => this.onSend()}>
                                        <ControlText style={Styles.textRight}
                                            fontSize={ControlText.FontSize.X_LARGE}>
                                            {(Strings && Strings.ChatBot.SEND) || "Send"}
                                        </ControlText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        );
    }
}

/**
 * Local stylesheet for this component.
 */
const localStyles = StyleSheet.create({
    item: {
        borderRadius: 20
    },
    p16: {
        padding: 16,
    }
});

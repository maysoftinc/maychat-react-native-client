import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    ViewProps,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    StatusBar,
    Linking,
    SafeAreaView,
    FlatList
} from "react-native";

import { Styles, Helpers, } from "../commons";
import ControlHeader from "./ControlHeader";
import ControlCircle from "./ControlCircle";
import { ControlText } from ".";
import { Constants, Strings } from "../constants";
import feathers from "@feathersjs/client";
import io from "socket.io-client";
import { TagSelect } from "react-native-tag-select";
import Toast from "react-native-tiny-toast";
import Hyperlink from "react-native-hyperlink";

export interface IProps extends ViewProps {
    title?: string;
    navigation?: any;
    botAvatar?: any;
    myAvatar?: any;
    apiKey: string;
    projectId: string;
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
    oldVisitorId?: string;
    onRefreshVisitorId?: (id: string) => void;
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
    public client = feathers();
    private socket = io(Constants.Api.BASE_URL, {
        transports: ['websocket'],
        path: "/api/socket.io/"
    });
    private visitor: any;
    private ref: any | null;
    constructor(props: any) {
        super(props);
        this.client.configure(feathers.socketio(this.socket, { timeout: Constants.Api.TIMEOUT }));
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
            const oldVisitorId = this.props.oldVisitorId;
            const visitorId = `${this.props.userName}@${this.props.projectId}`;
            if (oldVisitorId) {
                this.visitor = await this.client.authenticate({
                    strategy: "api-key",
                    apiKey: this.props.apiKey,
                    visitorName: this.props.userName,
                    visitorId,
                    _id: oldVisitorId,
                    projectType: "MOBILE"
                });
                if (this.visitor.messages && this.visitor.messages.length > 0) {
                    this.visitor.messages.forEach(this.loadMessages);
                }
            } else {
                this.visitor = await this.client.authenticate({
                    strategy: "api-key",
                    apiKey: this.props.apiKey,
                    visitorName: this.props.userName,
                    visitorId,
                    projectType: "MOBILE"
                });
                this.onRefreshVisitorId(this.visitor._id);
            }
        } catch (error) {
            this.onError(error);
        }
    }

    public async componentWillUnmount() {
        this.client.service("messages").off("created", this.loadMessages);
        // this.socket.close();
    }

    public onRefreshVisitorId = (id: string) => {
        if (this.props.onRefreshVisitorId && Helpers.isFunction(this.props.onRefreshVisitorId)) {
            this.props.onRefreshVisitorId(id);
        }
    }

    public onError = async (error: any) => {
        console.log(error);
        let toast = Toast.show("Connecting...", {
            duration: Constants.Api.TIMEOUT,
            position: Constants.Styles.HEADER_HEIGHT
        });
        try {
            await this.client.reAuthenticate(true);
            Toast.hide(toast);
        } catch (err) {
            console.log(err);
            Toast.hide(toast);
            Toast.show(Strings && Strings.App.CommonError, {
                duration: Toast.duration.SHORT,
                position: Toast.position.CENTER,
            });
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
            this.onError(error);
        }
    };

    public onSend = async (message?: string) => {
        try {
            if (Helpers.isNullOrEmpty(this.state.currentContent) && Helpers.isNullOrEmpty(message)) {
                return;
            }
            // Create a new message and then clear the input field
            await this.client.service("messages").create({
                projectId: this.visitor.projectId,
                channelId: this.visitor.channelId,
                threadId: this.visitor.threadId,
                senderId: this.visitor._id,
                messageType: 1,
                message: (Helpers.isString(message) && message) ? message : this.state.currentContent
            });
            this.setState({ currentContent: "" });
        } catch (error) {
            this.onError(error);
        }
    }

    public render() {
        const list = this.state.messageList || [];
        const headerColor = this.props.headerColor || "#ADD8E6";
        const bodyColor = this.props.bodyColor || "#ffffff";
        const messageBoxColor = this.props.licenseKey ? (this.props.messageBoxColor || "#F2F2F2") : "#F2F2F2";
        return (
            <View style={[Styles.fullSize, { backgroundColor: bodyColor }]}>
                <StatusBar hidden={false} translucent={true} barStyle="light-content" />
                <View style={[localStyles.header, { backgroundColor: headerColor }]} />
                <SafeAreaView style={[Styles.appContainer]}>
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
                            <FlatList
                                style={[{ flex: 1 }]}
                                ref={(ref: any) => { this.ref = ref; }}
                                onLayout={() => {
                                    this.ref.scrollToEnd({ animated: false });
                                }}
                                onContentSizeChange={() => {
                                    this.ref.scrollToEnd({ animated: true });
                                }}
                                showsVerticalScrollIndicator={false}
                                data={list}
                                renderItem={({ item, index }: any) => this._renderItem(item, index)}
                                keyExtractor={(item: any) => item.createTime}
                                ListHeaderComponent={this._renderHeader}
                            />
                            <View>
                                <TouchableOpacity onPress={() => Linking.openURL("http://maysoft.io/")}>
                                    <ControlText
                                        style={[Styles.text, Styles.textCenter, Styles.mb10, { color: bodyColor !== "#ffffff" ? messageBoxColor : "#333" }]}>
                                        {"Powered by maysoft.io"}
                                    </ControlText>
                                </TouchableOpacity>
                                <View style={[
                                    Styles.horizontal,
                                    {
                                        backgroundColor: messageBoxColor,
                                        borderRadius: 76 / 2,
                                        justifyContent: "space-between",
                                        paddingVertical: 4,
                                        paddingHorizontal: 10,
                                    }, Styles.alignCenter]}>
                                    <TextInput
                                        autoFocus
                                        autoCorrect={false}
                                        multiline={false}
                                        autoCapitalize="none"
                                        style={[{ minHeight: 36, flex: 1 }, Styles.textBoldDefault]}
                                        placeholder={(Strings && Strings.ChatBot.INPUT_MESSAGE)}
                                        value={this.state.currentContent}
                                        onChangeText={(currentContent: string) => {
                                            this.setState({ currentContent });
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => this.onSend()}>
                                        <ControlText style={Styles.textRight}
                                            fontSize={ControlText.FontSize.X_LARGE}>
                                            {(Strings && Strings.ChatBot.SEND)}
                                        </ControlText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
                <View style={[localStyles.footer, { backgroundColor: bodyColor }]} />
            </View>
        );
    }
    _renderHeader = () => {
        if (this.state.messageList && this.state.messageList?.length > 0) {
            return null;
        }
        const receiveMessageColor = this.props.licenseKey ? (this.props.receiveMessageColor || "#F2F2F2") : "#F2F2F2";
        const messageBoxColor = this.props.licenseKey ? (this.props.messageBoxColor || "#F2F2F2") : "#F2F2F2";
        const botAvatar = this.props.botAvatar;
        const tagColor = this.props.licenseKey ? (this.props.tagColor || "#F2F2F2") : "#F2F2F2";
        const tagSelectedColor = this.props.licenseKey ? (this.props.tagSelectedColor || "#ADD8E6") : "#ADD8E6";
        const tagLabelSelectedColor = this.props.licenseKey ? (this.props.tagLabelSelectedColor || "#ffffff") : "#ffffff";
        return (
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
                        itemLabelStyleSelected={{ color: tagLabelSelectedColor }}
                        onItemPress={(item: any) => {
                            this.onSend(item.label);
                        }}
                    />
                </View>
            </View>
        )
    }

    _renderMessageContent = (item: any) => {
        return (
            <Hyperlink onPress={(url, text) => Linking.openURL(url)}
                linkStyle={{ color: "#2980b9", fontSize: Constants.Styles.FONT_SIZE_MEDIUM }}>
                <ControlText>{Helpers.decodeHtmlElement(item.message)}</ControlText>
            </Hyperlink>
        );
    }

    _renderItem = (item: any, index: number) => {
        const receiveMessageColor = this.props.licenseKey ? (this.props.receiveMessageColor || "#F2F2F2") : "#F2F2F2";
        const sendMessageColor = this.props.licenseKey ? (this.props.sendMessageColor || "#ADD8E6") : "#ADD8E6";
        const myAvatar = this.props.myAvatar || require("../assets/images/default_avatar.png");
        if (item.isChatbot === 1 || item.senderId !== this.visitor._id) {
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
                        {this._renderMessageContent(item)}
                    </View>
                </View>
            )
        }
        return (
            <View key={index}
                style={[Styles.w100pc, Styles.alignEnd, index > 0 ? Styles.mt25 : {}]}>
                <View style={[Styles.horizontal, Styles.alignEnd]}>
                    <View style={[Styles.form, Styles.mr16, { backgroundColor: sendMessageColor, maxWidth: Constants.SCREEN_WIDTH - 16 - 24 - 16 - 16 }]}>
                        {this._renderMessageContent(item)}
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
    },
    header: {
        width: "100%",
        height: Constants.Styles.HEADER_BACKGROUND_HEIGHT,
        position: "absolute",
        top: 0
    },
    footer: {
        height: Constants.Styles.SAFE_AREA_INSETS.bottom,
        width: "100%",
        position: "absolute",
        bottom: 0,
        zIndex: -1
    }
});

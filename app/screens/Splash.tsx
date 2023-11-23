import { StyleSheet } from 'react-native'
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useState } from 'react';
import { hideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

type Props = {
    onComplete: (status: boolean) => void;
}
export function Splash({ onComplete }: Props) {
    const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

    function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        if (status.isLoaded) {
            if (lastStatus.isLoaded !== status.isLoaded) {
                hideAsync();
            }
            if (status.didJustFinish) {
                onComplete(true);
            }
        }
    }

    return (
        <>
            <StatusBar hidden={true}/>
            <Video
                style={StyleSheet.absoluteFill}
                resizeMode={ResizeMode.COVER}
                source={require('./video.mp4')}
                isLooping={false}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                shouldPlay={true}
            />

        </>

    )
}
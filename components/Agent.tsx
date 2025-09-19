import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {vapi} from "@/lib/vapi.sdk";

enum CallStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    CONECTING = "CONECTING",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

export const Agent = (agentProps:AgentProps) => {

    const router = useRouter();

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [lastMessage, setLastMessage] = useState<string>("");

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                }

                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error:Error) => console.log("Error", error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        }
    }, [])

    useEffect(() => {
        if (messages.length >0) {
            setLastMessage(messages[messages.length - 1].content);
        }

        const handleGenerateFeedback = () => {

        }

        const handleCall = async () => {
            setCallStatus(CallStatus.CONECTING);

            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: {
                    username: agentProps.userName,
                    userid: agentProps.userId
                }
            })
        }

        const handleDisconnect = async () => {
            setCallStatus(CallStatus.FINISHED);
            vapi.stop();
        }

    }, [messages, callStatus, agentProps.type, agentProps.userId]);

    const borderStyle = isSpeaking ? 'border-2 border-white blue-gradient-dark' : 'dark-gradient';

    return (
        <div className="flex flex-col w-full gap-10">
            <div className="flex flex-row items-center justify-between w-full">
                <div className={`flex flex-col items-center justify-center gap-5 overflow-hidden h-[400px] max-sm:h-[300px] w-5/11 rounded-lg ${borderStyle}`}>
                    <div className="flex items-center justify-center size-20 rounded-full p-5 blue-gradient relative z-10">
                        <div className="size-full relative rounded-full">
                            <Image src={'/ai-avatar.png'} alt={''} fill className="object-contain"/>
                        </div>
                        {isSpeaking && (
                            <span className="absolute size-5/6 animate-ping rounded-full bg-dark-400 opacity-75"></span>
                        )}
                    </div>
                    <h4>AI Interviewer</h4>
                </div>

                <div className={`flex flex-col items-center justify-center gap-5 overflow-hidden h-[400px] max-sm:h-[300px] w-5/11 rounded-lg ${borderStyle}`}>
                    <div className="flex items-center justify-center size-20 rounded-full p-5 blue-gradient relative z-10">
                        <div className="size-full relative rounded-full">
                            <Image src={'/user-avatar.png'} alt={''} fill className="object-cover"/>
                        </div>
                        {isSpeaking && (
                            <span className="absolute size-5/6 animate-ping rounded-full bg-dark-400 opacity-75"></span>
                        )}
                    </div>
                    <h4>{agentProps.userName}</h4>
                </div>
            </div>


            <div className="flex items-center justify-center w-full dark-gradient border-2 border-dark-200 rounded-lg p-3">
                <p className="font-semibold">{lastMessage}</p>
            </div>

            <div className="flex items-center justify-center w-full">
                {callStatus !== "ACTIVE" ? (
                    <button className="flex flex-row items-center justify-center rounded-3xl py-2 px-5 bg-success-200 hover:bg-success-100 gap-2 font-semibold cursor-pointer">
                        <div className="size-5 relative">
                            <Image src={'/call.svg'} alt={''} fill className="object-contain"/>
                        </div>
                        {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}

                    </button>
                ) : (
                    <button className="flex flex-row items-center justify-center rounded-3xl py-2 px-5 bg-destructive-200 hover:bg-destructive-100 gap-2 font-semibold cursor-pointer">
                        <div className="size-5 relative">
                            <Image src={'/call-slash.svg'} alt={''} fill className="object-contain"/>
                        </div>
                        Leave Interview
                    </button>
                )}
            </div>
        </div>

    )
}

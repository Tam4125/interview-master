"use client";

import React, {useState} from 'react'
import Image from 'next/image'
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import {useRouter} from "next/navigation";
import {InterviewForm} from "@/components/InterviewForm";
import {useCurrentUser, useUserInterviews} from "@/lib/hooks";

const Home = () => {
    const [formShown, setFormShown] = useState(false);
    const router = useRouter();

    const {user, loading} = useCurrentUser();
    const interviews = useUserInterviews();

    return (
        <div className="relative">
            <div className={`space-y-10 ${formShown? "blur-sm pointer-events-none opacity-10" : ""}`}>
                <section className="w-full blue-gradient-dark rounded-lg flex flex-row items-center p-5">
                    <div className="flex flex-col justify-center items-start w-3/5 max-sm:w-full space-y-5">
                        <h3>Get Interview-ready with AI-powered Practice & Feedback</h3>
                        <p className="text-normal-size">Practice real interview questions & get instant feedback</p>
                        <button
                            onClick={() => router.push("/")}
                            className="interview-btn w-1/2 max-sm:w-full text-normal-size"
                        >Start an interview</button>
                    </div>
                    <div className="w-2/5 flex-center max-sm:hidden relative size-50">
                        <Image src={'/robot.png'} alt={'robo'} fill className="object-contain"/>
                    </div>
                </section>

                <h3></h3>

                <section className="space-y-5">
                    <h3>Your Interview</h3>
                    <div className="grid gap-6 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {interviews.map((interview) => (
                            <InterviewCard interview={interview} key={interview._id}/>
                        ))}
                        <div className="flex justify-center items-center rounded-lg overflow-hidden border-2 border-white border-dashed">
                            <button
                                onClick={() => {
                                    setFormShown(!formShown)
                                    console.log(formShown)
                                }}
                            >
                                <div className="relative size-30 cursor-pointer">
                                    <Image src={'/add-circle-fill.svg'} alt={'circle-fill'} fill className="object-contain"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <h3>Interviews</h3>
                    <div className="grid gap-6 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {dummyInterviews.map((interview) => (
                            <InterviewCard interview={interview} key={interview.id}/>
                        ))}
                    </div>
                </section>
            </div>

            {formShown && (
                <div
                    className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setFormShown(false)} // close on outside click
                >
                    <div
                        className="w-1/3 max-lg:w-3/5 max-sm:w-4/5"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <InterviewForm />
                    </div>
                </div>
            )}
        </div>
    )
}
export default Home

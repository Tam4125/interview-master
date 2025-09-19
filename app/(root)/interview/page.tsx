"use client";

import React from 'react'
import {InterviewForm} from "@/components/InterviewForm";
import {Agent} from "@/components/Agent";
import {getCurrentUser} from "@/lib/actions/auth.action";



const InterviewPage = () => {

    return (
        <div className="flex justify-center items-center">
            <Agent></Agent>
        </div>
    )
}
export default InterviewPage

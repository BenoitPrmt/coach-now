import React from 'react';
import type {Gender} from "~/types";
import {MarsIcon, VenusIcon, XIcon} from "lucide-react";
import {formatGender} from "~/lib/formatting";

type Props = {
    gender: Gender
}

const CoachGender = ({ gender }: Props) => {
    switch (gender) {
        case "FEMALE":
            return <span className="text-pink-500 flex items-center">
          <VenusIcon className="inline w-4 h-4 mr-1"/>
                {formatGender(gender)}
        </span>;
        case "MALE":
            return <span className="text-blue-500 flex items-center">
          <MarsIcon className="inline w-4 h-4 mr-1"/>
                {formatGender(gender)}
        </span>;
        default:
            return <span className="text-neutral-500 flex items-center">
          <XIcon className="inline w-4 h-4 mr-1"/>
                {formatGender(gender)}
        </span>;
    }
};

export default CoachGender;
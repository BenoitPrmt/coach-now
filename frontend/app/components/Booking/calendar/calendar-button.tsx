import {cn} from "~/lib/utils";
import {type AriaButtonProps, useButton} from "@react-aria/button";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import type {CalendarState} from "@react-stately/calendar";
import {useRef} from "react";

export function Button(
    props: AriaButtonProps<"button"> & {
        state?: CalendarState;
        side?: "left" | "right";
    },
) {
    const ref = useRef<HTMLButtonElement>(null);
    const {buttonProps} = useButton(props, ref);
    const {focusProps, isFocusVisible} = useFocusRing();
    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            ref={ref}
            className={cn(
                "p-2 rounded-lg outline-none text-gray-950 dark:text-gray-50 cursor-pointer",
                props.isDisabled
                    ? "text-gray-700 dark:text-gray-400"
                    : "hover:bg-gray-400 dark:hover:bg-gray-600 active:bg-gray-500 dark:active:bg-gray-700",
                isFocusVisible && "ring-2 ring-offset-2 ring-gray-900 dark:ring-gray-100 dark:ring-offset-gray-800",
            )}
        >
            {props.children}
        </button>
    );
}
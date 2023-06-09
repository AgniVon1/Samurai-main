import React, {useEffect, useRef, useState} from "react";

export const useScroll = (objs: Array<any>) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            anchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [objs])

    return (
        {scrollHandler, anchorRef}
    );
};
import React from "react"
import {Preloader} from "../UI/Preloader/Preloader";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<Preloader/>} >
            <WrappedComponent {...props} />
        </React.Suspense>
    }
}

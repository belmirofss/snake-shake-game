import React from "react";

export function useForceUpdate(){
    const [_, setValue] = React.useState(0);
    return () => setValue(value => value + 1);
}
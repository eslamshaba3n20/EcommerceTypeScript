import { memo } from "react";

const Headding = memo(({ title }: { title: string }) => {
    console.log("Headding render");
    return (
        <p className="mb-3 " style={{ fontSize: "26px" }}>
            {title}
        </p>
    );
})

export default Headding;

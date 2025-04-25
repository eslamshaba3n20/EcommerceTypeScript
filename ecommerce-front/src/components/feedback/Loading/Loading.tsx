import { TLoading } from "@customTypes/shared";
type TLoadingProps = {
    stuts: TLoading;
    error: string | null;
    children: React.ReactNode;
}

const Loading = ({ stuts, error, children }: TLoadingProps) => {
    if (stuts === "pending") {
        return <p>Loading wait please...</p>;
    }
    if (stuts === "failed") {
        return <p>{error}</p>;
    }
    return <>{children}</>;

}


export default Loading;

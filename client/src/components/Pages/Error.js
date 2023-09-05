import { useRouteError } from "react-router-dom";

export default function Error() {
    const err = useRouteError();
    console.log(err);
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-indigo text-white">
            <h1 className="text-4xl mb-5">OOPS!!<br/>Something unexpected happened</h1>
            <h1 className="text-2xl">{err.status} : {err.statusText}</h1>
        </div>
    );
}

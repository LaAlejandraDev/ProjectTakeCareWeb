import StylizerText from "../../helpers/StylizedText";

export default function PostOpen({ postValues }) {
    return (
        <>
            <div className="w-full">
                <h2>Titulo</h2>
                <StylizerText text={postValues.content} />
            </div>
        </>
    )
}
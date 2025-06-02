import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
import instagram_black from "../assets/icons/instagram_black.svg";

export default function SocialMediaBox({ boxStyle }: { boxStyle?: string }) {
    return (
        <div className={`flex gap-3 md:gap-6 lg:gap-8 ${boxStyle}`}>
            <a href="#">
                <img src={facebook} alt="fcb" className="size-4 md:size-5" />
            </a>
            <a href="https://x.com/yorubamerlin_" target="_blank">
                <img src={twitter} alt="twt" className="size-4 md:size-5" />
            </a>
            <a href="https://www.instagram.com/yoruba_merlin" target="_blank">
                <img src={instagram_black} alt="ig" className="size-4 md:size-5" />
            </a>
        </div>
    );
}
